import React from 'react'
import CrudPage from '../CrudPage'

var SCHEMA = {
  fields: [
    {id: "id", name: "#", readonly: true},
    {id: "name", name: "Название"},
    {id: "trainType", name: "Направление тренировок"},
    {id: "trainer", name: "Тренер"},
    {id: "duration", name: "Продолжительность"},
    {id: "note", name: "Примечание", type: "textarea"}
  ],
  strings: {
    page_header: "Группы",
    add_label: "Добавить группу",
    edit_label: "Редактировать группу",
    add_label_short: "Добавить",
    update_label_short: "Обновить",
    delete_label_short: "Удалить"
  },
  urls: {
    api_root: "http://localhost:5000/api/v0/groups/?format=json",
    api_element: "http://localhost:5000/api/v0/groups/{0}/?format=json"
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
