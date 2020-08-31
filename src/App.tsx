import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute';
import { Box, Grid } from '@chakra-ui/core';
import NavBar from './components/NavBar';
import Unprotected from './scenes/unprotectedScene';
import Home from './scenes/home';

function App() {
  return (
    <Box bg="#fbfcfd" minHeight="100%" minWidth="100%" marginTop="0px">
      <NavBar></NavBar>
      <Grid>
        <Switch>
          <PrivateRoute path="/" component={Home} />
          <Route path="/vendors" component={Unprotected} />
        </Switch>
      </Grid>
    </Box>
  );
}

export default App;
