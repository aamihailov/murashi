import React from 'react'
import CrudPage from '../CrudPage'

var SCHEMA = {
  fields: [
    {id: "id", name: "#", readonly: true},
    {id: "name", name: "Название"},
    {id: "note", name: "Примечание", type: "textarea"}
  ],
  strings: {
    page_header: "Направления тренировок",
    add_label: "Добавить направление тренировок",
    edit_label: "Редактировать направление тренировок",
    add_label_short: "Добавить",
    update_label_short: "Обновить",
    delete_label_short: "Удалить"
  },
  urls: {
    api_root: "http://localhost:5000/api/v0/train-types/?format=json",
    api_element: "http://localhost:5000/api/v0/train-types/{0}/?format=json"
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
