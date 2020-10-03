import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import Register from './components/views/RegisterPage/RegisterPage'

import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        <Switch>
        {/* <Route path="/login">
            <LoginPage />
          </Route> */}
          {/* 더 깔끔하게쓰기 */}
          <Route exact path="/" component={Auth(LandingPage, null )} />
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/register" component={Auth(Register, false)} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
