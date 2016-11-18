import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import LayoutBase from '../LayoutBase'
import { EmptyPage, ClientsPage, TrainersPage, TrainTypesPage, LocationsPage, SubscriptionsPage, GroupsPage } from '../Pages'

class App extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path="/" component={ LayoutBase }>
          <IndexRoute component={ EmptyPage } />
          <Route path="schedule" component={ EmptyPage } />

          <Route path="client" component={ ClientsPage } />

          <Route path="trainer" component={ TrainersPage } />
          <Route path="group" component={ GroupsPage } />
          <Route path="traintype" component={ TrainTypesPage } />
          <Route path="subscription" component={ SubscriptionsPage } />
          <Route path="location" component={ LocationsPage } />

          <Route path="salary-plan" component={ EmptyPage } />
          <Route path="discount" component={ EmptyPage } />
          <Route path="debtors" component={ EmptyPage } />
          <Route path="cashout" component={ EmptyPage } />
        </Route>
      </Router>
    );
  }
}

export default App;
