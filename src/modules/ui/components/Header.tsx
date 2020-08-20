import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menu: {
    '& > *': {
      marginRight: theme.spacing(2),
    },
  },
}));

const Header: FC = () => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar className={classes.menu}>
        <Link component={RouterLink} color="inherit" to="/posts">
          Posts
        </Link>
        <Link component={RouterLink} color="inherit" to="/todos">
          Todos
        </Link>
        <Link component={RouterLink} color="inherit" to="/users">
          Users
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
