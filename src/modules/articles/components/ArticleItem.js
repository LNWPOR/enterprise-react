import React from 'react'
import {
  Grid,
  Chip,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useRouteMatch } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
  },
  category: {
    margin: theme.spacing(2, 0),
  },
}))

export default function ArticleItem({
  id,
  title,
  excerpt,
  image,
  category,
  user,
}) {
  const classes = useStyles()
  const history = useHistory()
  const { path } = useRouteMatch()

  const navigateToDetails = () => history.push(`${path}/${id}`)

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card onClick={navigateToDetails}>
        <CardActionArea>
          <CardMedia image={image} title={title} className={classes.media} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Grid
              container
              alignItems="center"
              justify="space-between"
              className={classes.category}
            >
              <Chip label={category.name} size="small"></Chip>
            </Grid>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {excerpt}
            </Typography>
            <Box display="flex" alignItems="center" mt={2}>
              <Avatar alt={user.name} src={user.avatar}></Avatar>
              <Box ml={2}>{user.name}</Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
