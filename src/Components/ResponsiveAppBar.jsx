import React from 'react';
import {
  AppBar, Button, Toolbar, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

function ResponsiveAppBar() {
  return (
    <AppBar position="static" style={{ flexDirection: 'row' }}>
      <Toolbar style={{ flex: 1 }}>
        <Button>
          <Link to="/workspace/create" style={{ textDecoration: 'none' }}>
            <Typography color="white">Create post</Typography>
          </Link>
        </Button>
        <Button>
          <Link to="/workspace/posts" style={{ textDecoration: 'none' }}>
            <Typography color="white">View posts</Typography>
          </Link>
        </Button>
      </Toolbar>
      <Toolbar>
        <Button>
          <Link to="/workspace/settings" style={{ textDecoration: 'none' }}>
            <Typography color="white">Settings</Typography>
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
