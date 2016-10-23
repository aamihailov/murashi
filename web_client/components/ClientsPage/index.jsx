import React from 'react'
import CrudPage from '../CrudPage'

var SCHEMA = {
  fields: [
    {id: "id", name: "#", readonly: true},
    {id: "name", name: "Имя"},
    {id: "phone", name: "Телефон"},
    {id: "balance", name: "Баланс"},
    {id: "note", name: "Примечание"}
  ],
  strings: {
    page_header: "Клиенты",
    add_label: "Добавить клиента",
    edit_label: "Редактировать клиента",
    add_label_short: "Добавить",
    update_label_short: "Обновить",
    delete_label_short: "Удалить"
  },
  urls: {
    api_root: "http://localhost:5000/api/v0/clients/?format=json",
    api_element: "http://localhost:5000/api/v0/clients/{0}/?format=json"
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
