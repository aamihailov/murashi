import React from 'react'
import CrudPage from '../CrudPage'

var SCHEMA = {
  fields: [
    {id: "id", name: "#", readonly: true},
    {id: "name", name: "Имя", mandatory: true},
    {id: "phone", name: "Телефон"},
    {id: "balance", name: "Баланс", validator: function(v) { return !isNaN(v)}},
    {id: "note", name: "Примечание", type: "textarea"}
  ],
  strings: {
    page_header: "Тренеры",
    add_label: "Добавить тренера",
    edit_label: "Редактировать тренера",
    add_label_short: "Добавить",
    update_label_short: "Обновить",
    delete_label_short: "Удалить"
  },
  urls: {
    api_root: "http://localhost:5000/api/v0/trainers/?format=json",
    api_element: "http://localhost:5000/api/v0/trainers/{0}/?format=json"
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
