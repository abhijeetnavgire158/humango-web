import React from 'react';
import { Router } from 'react-router-dom';
import history from './Services/history';
import Routes from './Routes';
import './App.css';
import './styles/app.scss';

function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}

export default App;
