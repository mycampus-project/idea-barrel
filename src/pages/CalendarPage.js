import { React, useState, useEffect, useContext } from "react";
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
import BackendAPI from "../api/BackendAPI";
import { WebApiAdaptor } from "@syncfusion/ej2-data";
import { UserContext } from "../contexts/UserContext";
import { SnackbarContext } from "../contexts/SnackbarContext";

const { fetchEventsAsync } = BackendAPI();
const { postEventAsync } = BackendAPI();

const CalendarPage = () => {
  const { setSnackbar } = useContext(SnackbarContext);
  const { user } = useContext(UserContext); // eslint-disable-line
  const [localData, setLocalData] = useState(null);

  const checkUser = (user, data) => {
    if (user.email === data.senderEmail)
      return false
    else
      return true
  }
  const getEvents = async () => {
    try {
      const response = await fetchEventsAsync();
      console.log("user: ", user);
      console.log("events from database :", response);
      let temp = [...response];
      temp = temp.map((el) => {
        return {
          Id: el.id,
          End: new Date(el.endTime),
          Start: new Date(el.startTime),
          Summary: el.title,
          IsReadonly: checkUser(user,el),
          //isAllDay: true,
          Description: el.body
        };
      });
      setLocalData({
        dataSource: temp,
        fields: {
          subject: { name: "Summary", default: "No title is provided" },
          startTime: { name: "Start" },
          endTime: { name: "End" },
        },
        adaptor: new WebApiAdaptor(),
        crossDomain: true,
      });
    } catch (e) {
      console.log("error fetching bulletins");
    }
  };

  const createEvent = (args) => {
    console.log("what happen? ", args.addedRecords[0]);
    const data = {
      body: args.addedRecords[0].Description
        ? args.addedRecords[0].Description
        : "Not specify",
      category: "Not Specify",
      date: new Date().toISOString(),
      endTime: new Date(
        args.addedRecords[0].End
          ? args.addedRecords[0].End
          : args.addedRecords[0].EndTime
      ).toISOString(),
      id: args.addedRecords[0].Id,
      senderEmail: user.email,
      senderId: user.id,
      senderfName: user.fName,
      senderlName: user.lName,
      startTime: new Date(
        args.addedRecords[0].Start
          ? args.addedRecords[0].Start
          : args.addedRecords[0].StartTime
      ).toISOString(),
      title: args.addedRecords[0].Summary
        ? args.addedRecords[0].Summary
        : args.addedRecords[0].Subject,
      description: args.addedRecords[0].Description,
    };
    console.log("Data after added: ", data);

    // post data API here
    
    const postEvent = async () => {
      const dataSubmit = {
        senderId: data.senderId,
        senderEmail: data.senderEmail,
        senderfName: data.senderfName,
        senderlName: data.senderlName,
        title: data.title,
        body: data.body ,
        category: data.category,
        startTime: data.startTime,
        endTime: data.endTime,
      };
      console.log("POSTED DATA DATA: ", dataSubmit);
      console.log("USER CREATEVENT:", user);
  
      const res = await postEventAsync(dataSubmit);
  
      if (res.status === 200) {
        setSnackbar("Event added", 3, 2000);
      } else if (res.status === 400) {
        setSnackbar("Cannot add event: status 400", 1, 2000);
      } else {
        console.log("different error");
      }
    };
    postEvent();

    // Fetch event again here
    getEvents();
  };
  useEffect(() => {
    // Data of user
    console.log("data of current user: ", user);

    // Fetch event
    getEvents();
  }, [user]); // eslint-disable-line

  return (
    <div>
      <ScheduleComponent
        currentView="WorkWeek"
        eventSettings={localData}
        actionComplete={(args) => {
          console.log("what happen? ", args);
          if (
            args.requestType === "eventCreated" &&
            args.addedRecords != null
          ) {
            createEvent(args);
          }
          
        }}
      >
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
