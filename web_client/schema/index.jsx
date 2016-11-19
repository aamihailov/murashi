var SCHEMA = {
  trainer: {
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

  traintype: {
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

  subscription: {
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

  location: {
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

  group: {
    fields: [
      {id: "id", name: "#", readonly: true},
      {id: "name", name: "Название"},
      {id: "traintype", name: "Направление тренировок", type: "ref", ref: "traintype"},
      {id: "trainer", name: "Тренер", type: "ref", ref: "trainer"},
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

  client: {
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
  },

  event: {
    fields: [
      {id: "id", name: "#", readonly: true},
      {id: "title", name: "Название"},
      {id: "start", name: "Начало", type: "datetime"},
      {id: "end", name: "Конец", type: "datetime"},
//      {id: "created_on", name: "Создано", type: "datetime", readonly: true},
//      {id: "updated_on", name: "Изменено", type: "datetime", readonly: true},
      {id: "rule", name: "Правило", type: "ref", ref: "rule"},
      {id: "end_recurring_period", name: "Конец повторения", type: "datetime"},
      {id: "description", name: "Примечание", type: "textarea"},
//      {id: "color_event", name: "Цвет"},
    ],
    strings: {
      page_header: "События",
      add_label: "Добавить событие",
      edit_label: "Редактировать событие",
      add_label_short: "Добавить",
      update_label_short: "Обновить",
      delete_label_short: "Удалить"
    },
    name: "title",
    urls: {
      api_root: "http://localhost:5000/api/v0/events/?format=json",
      api_element: "http://localhost:5000/api/v0/events/{0}/?format=json"
    }
  },

  occurrence: {
    fields: [
      {id: "id", name: "#", readonly: true},
      {id: "event", name: "Событие", type: "ref", ref: "event"},
      {id: "title", name: "Название"},
      {id: "start", name: "Начало", type: "datetime"},
      {id: "end", name: "Конец", type: "datetime"},
      {id: "original_start", name: "Исходное начало", type: "datetime"},
      {id: "original_end", name: "Исходный конец", type: "datetime"},
//      {id: "created_on", name: "Создано", type: "datetime", readonly: true},
//      {id: "updated_on", name: "Изменено", type: "datetime", readonly: true},
      {id: "description", name: "Примечание", type: "textarea"},
//      {id: "color_event", name: "Цвет"},
    ],
    strings: {
      page_header: "Случаи",
      add_label: "Добавить случай",
      edit_label: "Редактировать случай",
      add_label_short: "Добавить",
      update_label_short: "Обновить",
      delete_label_short: "Удалить"
    },
    urls: {
      api_root: "http://localhost:5000/api/v0/occurrences/?format=json",
      api_element: "http://localhost:5000/api/v0/occurrences/{0}/?format=json"
    }
  },

  rule: {
    fields: [
      {id: "id", name: "#", readonly: true},
      {id: "name", name: "Имя"},
      {id: "description", name: "Примечание", type: "textarea"},
      {id: "frequency", name: "Частота"},
      {id: "params", name: "Параметры"},
    ],
    strings: {
      page_header: "Правила",
      add_label: "Добавить правило",
      edit_label: "Редактировать правило",
      add_label_short: "Добавить",
      update_label_short: "Обновить",
      delete_label_short: "Удалить"
    },
    urls: {
      api_root: "http://localhost:5000/api/v0/rules/?format=json",
      api_element: "http://localhost:5000/api/v0/rules/{0}/?format=json"
    }
  },


};

export default SCHEMA
