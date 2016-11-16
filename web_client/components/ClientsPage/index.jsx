import React from 'react'
import CrudPage from '../CrudPage'
import schema from '../../schema'

var Page = React.createClass({
  render(){
    return(
      <CrudPage model={'clients'} schema={schema}/>
    );
  }
});

export default Page
