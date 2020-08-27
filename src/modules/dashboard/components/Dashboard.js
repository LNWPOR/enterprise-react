import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import {
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListSubheader,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Group, MenuBook, Category } from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'
import { Doughnut } from 'react-chartjs-2'

const useStyles = makeStyles((theme) => ({
  summaryCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  summaryTitle: {
    margin: theme.spacing(2, 0),
  },
  chart: {
    '& canvas': {
      maxWidth: '100%',
    },
  },
}))

export default function Dashboard() {
  const classes = useStyles()
  const [dashboard, setDashboard] = useState(null)

  const loadDashboard = useCallback(async () => {
    const {
      data: { dashboard },
    } = await axios.get('/dashboard')

    setDashboard(dashboard)
  }, [])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  if (!dashboard) return null

  const usersCount =
    dashboard.usersCount[0].count + dashboard.usersCount[1].count

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper className={classes.summaryCard}>
              <Group color="primary" fontSize="large"></Group>
              <Typography variant="body1" className={classes.summaryTitle}>
                Users
              </Typography>
              <Typography variant="h5" color="primary">
                {usersCount}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.summaryCard}>
              <Category color="primary" fontSize="large"></Category>
              <Typography variant="body1" className={classes.summaryTitle}>
                Categories
              </Typography>
              <Typography variant="h5" color="primary">
                {dashboard.categoriesCount}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.summaryCard}>
              <MenuBook color="primary" fontSize="large"></MenuBook>
              <Typography variant="body1" className={classes.summaryTitle}>
                Articles
              </Typography>
              <Typography variant="h5" color="primary">
                {dashboard.articlesCount}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Paper>
          <Box
            display="flex"
            justifyContent="center"
            p={2}
            my={2}
            className={classes.chart}
          >
            <Doughnut
              options={{
                legend: {
                  labels: {
                    fontColor: grey[500],
                  },
                },
              }}
              data={{
                datasets: [
                  {
                    data: dashboard.usersCount.map((item) => item.count),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  },
                ],

                labels: dashboard.usersCount.map((item) => item.role),
              }}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Paper>
          <List subheader={<ListSubheader>Latest Articles</ListSubheader>}>
            {dashboard.latestArticles.map((article) => (
              <ListItem key={article.id} button>
                <ListItemAvatar>
                  <Avatar src={article.image}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={article.title}
                  secondary={article.excerpt}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  )
}
