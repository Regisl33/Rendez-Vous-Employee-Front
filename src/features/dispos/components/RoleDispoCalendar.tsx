import { useState } from "react";
import { Calendar, dayjsLocalizer, Event } from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import dayjs from "dayjs";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const start = dayjs().hour();
const end = dayjs().add(2, "hour");

const RoleDispoCalendar = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      title: "Learn cool stuff",
      start,
      end,
    },
  ]);

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { start, end } = data;

    setEvents((currentEvents) => {
      const firstEvent = {
        start: new Date(start),
        end: new Date(end),
      };
      return [...currentEvents, firstEvent];
    });
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    console.log(data);
  };

  const DnDCalendar = withDragAndDrop(Calendar);

  const localizer = dayjsLocalizer(dayjs);

  return (
    <DnDCalendar
      defaultView="week"
      events={events}
      localizer={localizer}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      resizable
      style={{ height: "100vh" }}
    />
  );
};

export default RoleDispoCalendar;
