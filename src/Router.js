import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from 'App';
import Pomodoro from 'Scenes/Pomodoro';

class Router extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App>
          <Route path="/" component={Pomodoro} />
        </App>
      </BrowserRouter>
    );
  }
}

export default Router;
