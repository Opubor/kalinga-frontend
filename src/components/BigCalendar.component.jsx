import React, { useEffect, useState } from "react";
import { FcCalendar } from "react-icons/Fc";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function ReactCalendar() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Sample data
    const sampleAppointments = [
      {
        title: "Meeting",
        start: new Date(2023, 3, 10, 10, 0),
        end: new Date(2023, 3, 10, 11, 0),
      },
      {
        title: "Lunch",
        start: new Date(2023, 3, 10, 12, 0),
        end: new Date(2023, 3, 10, 13, 0),
      },
    ];
    setAppointments(sampleAppointments);
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-3">
      <div className="text-base shadow-md shadow-gray-500 col-span-3 border-t-4 border-t-blue-600">
        <h1 className="font-bold p-4 text-2xl flex items-center gap-2">
          {React.createElement(FcCalendar, { size: "20" })}Calendar
        </h1>

        <Calendar
          localizer={localizer}
          events={appointments}
          titleAccessor="title"
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          className="bg-white p-4 rounded-xl"
        />
      </div>
      <div></div>
    </div>
  );
}

export default ReactCalendar;
