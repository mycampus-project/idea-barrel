import React from "react";
import EventNavigationBar from "../components/navigation/EventNavigationBar";
import {Inject, ScheduleComponent,Day,Week,WorkWeek, Month, Agenda} from "@syncfusion/ej2-react-schedule";

const CalendarPage = () => {
  return (
    <div>
      <EventNavigationBar></EventNavigationBar>
      <p>Calendar</p>
      {/* <ScheduleComponent /> */}
      <ScheduleComponent>
        <Inject services = {[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};

export default CalendarPage;
