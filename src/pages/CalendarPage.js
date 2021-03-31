import React from "react";
// eslint-disable-next-line
import {Inject, ScheduleComponent,Day,Week,WorkWeek, Month, Agenda, EventSettingsModel,ViewsDirective,ViewDirective,TimelineViews,TimelineMonth} from "@syncfusion/ej2-react-schedule";
import {DataManager, WebApiAdaptor} from "@syncfusion/ej2-data";


const CalendarPage = () => {
  const localData  = {
    dataSource: [{
      Id: 1,
      End: new Date(2021,3,1,6,30),
      Start: new Date(2021,3,1,4,0),
      Summary: '',
      // IsAllDay: true,
      // RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=10',
      IsReadonly: true
    },
    {
      Id: 2,
      End: new Date(2021,3,2,3,30),
      Start: new Date(2021,3,2,1,0),
      Summary: 'Test id2',
      // IsBlock: true
      IsAllDay: true,
      RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=2',
    },
    {
      Id: 3,
      End: new Date(2021,3,4,3,30),
      Start: new Date(2021,3,4,1,0),
      Summary: 'Test id2',
      // IsBlock: true
      IsAllDay: true,
    },
    {
      Id: 4,
      End: new Date(2021,3,5,3,30),
      Start: new Date(2021,3,5,1,0),
      Summary: 'Test id2',
      // IsBlock: true
      IsAllDay: true,
    },
    {
      Id: 5,
      End: new Date(2021,3,6,3,30),
      Start: new Date(2021,3,6,1,0),
      Summary: 'Test id2',
      // IsBlock: true
      // IsAllDay: true,
    },{
      Id: 6,
      End: new Date(2021,3,7,3,30),
      Start: new Date(2021,3,7,1,0),
      Summary: 'Test id2',
      IsBlock: true
      // IsAllDay: true,
    },
    {
      Id: 7,
      End: new Date(2021,3,8,3,30),
      Start: new Date(2021,3,8,1,0),
      Summary: 'Test id2',
      IsBlock: true,
      IsAllDay: true,
    }
  ],
    fields: {
      subject: { name: 'Summary', default: 'No title is provided'},
      startTime: {name: 'Start'},
      endTime: {name: 'End'}
    }
  }
  // eslint-disable-next-line
  const remoteData = new DataManager({
    url : 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  });

  return (
    <div>
      <ScheduleComponent currentView = 'Week' eventSettings = {localData}>
      <ViewsDirective>
        <ViewDirective option = 'Day' interval = {3}></ViewDirective>
        <ViewDirective option = 'Week'></ViewDirective>
        <ViewDirective option = 'WorkWeek' startHour = '08:00' endHour = '18:00'></ViewDirective>
        <ViewDirective option = 'Month' isSelected= {true} showWeekNumber = {true}></ViewDirective>
        <ViewDirective option = 'Agenda'></ViewDirective>
        <ViewDirective option = 'TimelineDay'></ViewDirective>
        <ViewDirective option = 'TimelineMonth'></ViewDirective>
      </ViewsDirective>
      <Inject services = {[Day, Week, WorkWeek, Month, Agenda,TimelineViews,TimelineMonth ]} />
      </ScheduleComponent>
    </div>
  );
};

export default CalendarPage;
