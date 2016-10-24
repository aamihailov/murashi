import React from 'react'
import CrudPage from '../CrudPage'

var SCHEMA = {
  fields: [
    {id: "id", name: "#", readonly: true},
    {id: "name", name: "Название"},
    {id: "visits", name: "Занятий"},
    {id: "validDays", name: "Срок действия"},
    {id: "price", name: "Стоимость"},
    {id: "note", name: "Примечание", type: "textarea"}
  ],
  strings: {
    page_header: "Абонементы",
    add_label: "Добавить абонемент",
    edit_label: "Редактировать абонемент",
    add_label_short: "Добавить",
    update_label_short: "Обновить",
    delete_label_short: "Удалить"
  },
  urls: {
    api_root: "http://localhost:5000/api/v0/subscriptions/?format=json",
    api_element: "http://localhost:5000/api/v0/subscriptions/{0}/?format=json"
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
