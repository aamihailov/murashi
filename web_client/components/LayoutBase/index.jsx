import React from 'react'
import { withRouter } from 'react-router'
import Navigation from '../Navigation'
import { Grid } from 'react-bootstrap'

import './footer.scss'

const LayoutBase = withRouter(React.createClass({
  render() {
    return (
      <div className="App">
        <Navigation activeKey={this.props.location.pathname}/>
        <Grid>
          {this.props.children && React.cloneElement(this.props.children, {key: location.pathname})}
        </Grid>
        <footer className="footer">
          <Grid>
            <p className="text-muted">zzdos 2016</p>
          </Grid>
        </footer>
      </div>
    );
  }
}));

export default LayoutBase;
