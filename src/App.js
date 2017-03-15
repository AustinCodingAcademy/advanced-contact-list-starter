import React from 'react';
import ProfileContainer from './containers/ProfileContainer';
import ContactsContainer from './containers/ContactsContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className="router">
        <Switch>
          <Route exact path="/" component={ContactsContainer} />
          <Route exact path="/profile/:id" component={ProfileContainer} />
          <Route render={() => <h2>Not found!</h2>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
