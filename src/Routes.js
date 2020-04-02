import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn/signin';
import SignUp from './Pages/SignUp/signup';
import Dashboard from './Pages/Dashboard/dashboard';
export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/login" component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route component={SignIn} />
    </Switch>
  );
}