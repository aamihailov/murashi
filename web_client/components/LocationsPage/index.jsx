import React from 'react'
import CrudPage from '../CrudPage'
import schema from '../../schema'

var Page = React.createClass({
  render(){
    return(
      <CrudPage model={'locations'} schema={schema} data={[]}/>
    );
  }
});

export default Page
