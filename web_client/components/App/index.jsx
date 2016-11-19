import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import LayoutBase from '../LayoutBase'
import { EmptyPage,
         ClientsPage, TrainersPage, TrainTypesPage, LocationsPage, SubscriptionsPage, GroupsPage } from '../Pages'
import { CalendarPage, EventsPage, OccurrencesPage, RulesPage } from '../CalendarPage'

class App extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path="/" component={ LayoutBase }>
          <IndexRoute component={ EmptyPage } />
          <Route path="schedule" component={ CalendarPage } />
          <Route path="event" component={ EventsPage } />
          <Route path="occurrence" component={ OccurrencesPage } />
          <Route path="rule" component={ RulesPage } />

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
