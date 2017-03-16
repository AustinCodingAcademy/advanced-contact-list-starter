import React, {Component} from 'react';
import Profile from './Profile';
import Contacts from './Contacts';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export default class App extends Component {
  render() {
    <BrowserRouter>
      <div className="router">
        <Switch>
          <Route exact path="/" Component={Contacts} />
          <Route exact path="/profile/:id" Component={Profile} />
          <Route render={() => <h2>Not Found!</h2>} />
        </Switch>
      </div>
    </BrowserRouter>;
  }
}
