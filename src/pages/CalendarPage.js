import React from "react";
import {Inject, ScheduleComponent,Day,Week,WorkWeek, Month, Agenda} from "@syncfusion/ej2-react-schedule";

const CalendarPage = () => {
  return (
    <div>
      <ScheduleComponent>
        <Inject services = {[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};

export default CalendarPage;
