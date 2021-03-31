import React from "react";
import {Inject, ScheduleComponent,Day,Week,WorkWeek, Month, Agenda, EventSettingsModel} from "@syncfusion/ej2-react-schedule";
import {DataManager, WebApiAdaptor} from "@syncfusion/ej2-data";

class CalendarPage extends React.Component{
  private localData : EventSettingsModel = {
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
      End: new Date(2021,2,31,3,30),
      Start: new Date(2021,2,31,1,0),
      Summary: 'Test id2',
      // IsBlock: true
      IsAllDay: true,
    }
  ],
    fields: {
      subject: { name: 'Summary', default: 'No title is provided'},
      startTime: {name: 'Start'},
      endTime: {name: 'End'}
    }
  }
  private remoteData = new DataManager({
    url : 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });

  public render(){
    return <ScheduleComponent currentView = 'Month' eventSettings = { this.localData} >
    <Inject services = {[Day, Week, WorkWeek, Month, Agenda ]} />
  </ScheduleComponent>
  }
}

export default CalendarPage;
