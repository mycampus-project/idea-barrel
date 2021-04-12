import {React,useState,useEffect}  from "react";
// eslint-disable-next-line
import {Inject, ScheduleComponent,Day,Week,WorkWeek, Month, Agenda,ViewsDirective,ViewDirective,TimelineViews,TimelineMonth} from "@syncfusion/ej2-react-schedule";
import BackendAPI from "../api/BackendAPI";
import {WebApiAdaptor} from '@syncfusion/ej2-data';


const { fetchEventsAsync /*,fetchUsersAsync*/ } = BackendAPI();
import { React, useState, useEffect } from "react";
// eslint-disable-next-line
import { SnackbarContext } from "../contexts/SnackbarContext"; // eslint-disable-next-line
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  ViewsDirective,
  ViewDirective,
  TimelineViews,
  TimelineMonth,
} from "@syncfusion/ej2-react-schedule";
import BackendAPI from "../api/BackendAPI"; // eslint-disable-next-line
import { FormatListNumberedRtlOutlined } from "@material-ui/icons"; // eslint-disable-next-line

const { fetchEventsAsync } = BackendAPI();
const CalendarPage = () => {
  const [localData, setLocalData] = useState(null);
  const getEvents = async () => {
    try {
      const response = await fetchEventsAsync();
      console.log("response :", response);
      let temp = [...response];
      temp = temp.map((el) => {
        //if (el.visibleTo == null || el.visibleTo === "owneruserid") {
          //update owneruserid later
          return {
            Id: el._rid,
            End: new Date(el.endTime),
            Start: new Date(el.startTime),
            Summary: el.title,
            IsReadonly: true,
            //IsAllDay: true,
          }
       });
    
      setLocalData({
        dataSource: temp,
        fields: {
          subject: { name: "Summary", default: "No title is provided" },
          startTime: { name: "Start" },
          endTime: { name: "End" },
        },
      });
    } catch (e) {
      console.log("error fetching bulletins");
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <ScheduleComponent currentView="Week" eventSettings={localData}>
        <ViewsDirective>
          <ViewDirective option="Day" interval={3}></ViewDirective>
          <ViewDirective option="Week"></ViewDirective>
          <ViewDirective
            option="WorkWeek"
            startHour="08:00"
            endHour="18:00"
          ></ViewDirective>
          <ViewDirective
            option="Month"
            isSelected={true}
            showWeekNumber={true}
          ></ViewDirective>
          <ViewDirective option="Agenda"></ViewDirective>
          <ViewDirective option="TimelineDay"></ViewDirective>
          <ViewDirective option="TimelineMonth"></ViewDirective>
        </ViewsDirective>
        <Inject
          services={[
            Day,
            Week,
            WorkWeek,
            Month,
            Agenda,
            TimelineViews,
            TimelineMonth,
          ]}
        />
      </ScheduleComponent>
    </div>
  );
};

export default CalendarPage;
