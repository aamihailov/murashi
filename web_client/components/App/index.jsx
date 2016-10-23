import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import LayoutBase from '../LayoutBase'
import EmptyPage from '../EmptyPage'
import ClientsPage from '../ClientsPage'

class App extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path="/" component={ LayoutBase }>
          <IndexRoute component={ EmptyPage } />
          <Route path="schedule" component={ EmptyPage } />

          <Route path="client" component={ ClientsPage } />

          <Route path="trainer" component={ EmptyPage } />
          <Route path="group" component={ EmptyPage } />
          <Route path="train-type" component={ EmptyPage } />
          <Route path="subscription" component={ EmptyPage } />
          <Route path="location" component={ EmptyPage } />

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
