import React, {Component} from 'react';
import Profile from './Profile';
import Contacts from './Contacts';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="router">
          <Switch>
            <Route exact path="/" component={Contacts} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route render={() => <h2>Not Found!</h2>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
