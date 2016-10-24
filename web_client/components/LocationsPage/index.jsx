import React from 'react'
import CrudPage from '../CrudPage'

var SCHEMA = {
  fields: [
    {id: "id", name: "#", readonly: true},
    {id: "name", name: "Название", mandatory: true},
    {id: "note", name: "Примечание", type: "textarea"}
  ],
  strings: {
    page_header: "Залы",
    add_label: "Добавить зал",
    edit_label: "Редактировать зал",
    add_label_short: "Добавить",
    update_label_short: "Обновить",
    delete_label_short: "Удалить"
  },
  urls: {
    api_root: "http://localhost:5000/api/v0/locations/?format=json",
    api_element: "http://localhost:5000/api/v0/locations/{0}/?format=json"
  }
}

var Page = React.createClass({
  render(){
    return(
      <CrudPage strings={SCHEMA.strings} schema={SCHEMA.fields} urls={SCHEMA.urls} data={[]}/>
    );
  }
});

export default Page
