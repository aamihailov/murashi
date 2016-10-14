import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import LayoutBase from '../LayoutBase'
import Main from '../Main'
import ClientsPage from '../ClientsPage'

class App extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path="/" component={ LayoutBase }>
          <IndexRoute component={ Main } />
          <Route path="schedule" component={ Main } />

          <Route path="client" component={ ClientsPage } />

          <Route path="trainer" component={ Main } />
          <Route path="group" component={ Main } />
          <Route path="train-type" component={ Main } />
          <Route path="subscription" component={ Main } />
          <Route path="location" component={ Main } />

          <Route path="salary-plan" component={ Main } />
          <Route path="discount" component={ Main } />
          <Route path="debtors" component={ Main } />
          <Route path="cashout" component={ Main } />
        </Route>
      </Router>
    );
  }
}

export default App;
