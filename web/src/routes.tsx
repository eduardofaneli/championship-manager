import { Route, BrowserRouter } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home';
import Profile from './pages/Profile';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={Profile} path="/profile"/>;
    </BrowserRouter>
  )
}

export default Routes;