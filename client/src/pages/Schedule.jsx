import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyBigCalendar = () => {
  const [events, setEvents] = useState([]);

  return (
    <div className='bg-white'>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className='md:h-screen h-[25rem] p-2'
      />
    </div>
  );
};

export default MyBigCalendar;
