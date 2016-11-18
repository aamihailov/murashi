import React from 'react'
import { withRouter } from 'react-router'
import Navigation from '../Navigation'
import { Grid } from 'react-bootstrap'

import './footer.scss'

export default props => (
  <div className="App">
    <Navigation activeKey={props.location.pathname}/>
    <Grid>
      {props.children && React.cloneElement(props.children, {key: location.pathname})}
    </Grid>
    <footer className="footer">
      <Grid>
        <p className="text-muted">zzdos 2016</p>
      </Grid>
    </footer>
  </div>
);
