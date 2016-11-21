import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('ru');
BigCalendar.momentLocalizer(moment);

var MESSAGES = {
  allDay: 'Весь день',
  previous: 'Назад',
  next: 'Вперёд',
  today: 'Сегодня',
  month: 'Месяц',
  week: 'Неделя',
  day: 'День',
  agenda: 'Список'
};

export class CalendarPage extends Component {
  render() {
    return (
      <div style={{height:600}}>
        <BigCalendar
          {...this.props}
          selectable
          events={[]}
          defaultView='week'
          timeslots={2}
          messages={MESSAGES}
          defaultDate={new Date(2015, 3, 1)}
          onNavigate={e => console.log(e)}
          onSelectEvent={e => console.log(e)}
          onSelectSlot={slotInfo => console.log(slotInfo)}
        />
      </div>
    );
  }
}

import CrudPage from '../CrudPage'
import schema from '../../schema'
export const EventsPage = props => (
  <CrudPage model={'event'} schema={schema}/>
);

export const OccurrencesPage = props => (
  <CrudPage model={'occurrence'} schema={schema}/>
);

export const RulesPage = props => (
  <CrudPage model={'rule'} schema={schema}/>
);
