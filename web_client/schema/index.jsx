var SCHEMA = {
  trainers: {
    fields: [
      {id: "id", name: "#", readonly: true},
      {id: "name", name: "Имя"},
      {id: "phone", name: "Телефон"},
      {id: "balance", name: "Баланс"},
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
  },

  traintypes: {
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
      api_root: "http://localhost:5000/api/v0/traintypes/?format=json",
      api_element: "http://localhost:5000/api/v0/traintypes/{0}/?format=json"
    }
  },

  subscriptions: {
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
  },

  locations: {
    fields: [
      {id: "id", name: "#", readonly: true},
      {id: "name", name: "Название"},
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
  },

  groups: {
    fields: [
      {id: "id", name: "#", readonly: true},
      {id: "name", name: "Название"},
      {id: "traintype", name: "Направление тренировок", type: "ref", ref: "traintypes"},
      {id: "trainer", name: "Тренер", type: "ref", ref: "trainers"},
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
  },

  clients: {
    fields: [
      {id: "id", name: "#", readonly: true},
      {id: "name", name: "Имя"},
      {id: "phone", name: "Телефон"},
      {id: "balance", name: "Баланс"},
      {id: "note", name: "Примечание", type: "textarea"}
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
};

export default SCHEMA
