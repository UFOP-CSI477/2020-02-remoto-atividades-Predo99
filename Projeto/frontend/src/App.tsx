import React from 'react';

import './styles/global.css'

import Routes from './routes';
import axios from 'axios';

axios.defaults.headers.common['x-access-token'] = localStorage.getItem('x-access-token');

function App() {
  return (
    <Routes />
  );
}

export default App;
