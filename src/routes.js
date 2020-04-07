import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn/signin';
import SignUp from './Pages/SignUp/signup';
import Dashboard from './Pages/Dashboard/dashboard';
import GarminConnection from './Pages/GarminConnection/garminconnection';
export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/login" component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/garmin-connection" component={GarminConnection}  />
      <Route component={SignIn} />
    </Switch>
  );
}