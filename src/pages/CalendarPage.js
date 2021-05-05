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

const { fetchEventsAsync, postEventAsync, deleteEventAsync } = BackendAPI();

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
  const checkEVent = (user,data) => {
    if (data.category === "Not specified")
    {
      if (user.email === data.senderEmail)
        return true
      else
        return false
    }
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
        if (checkEVent(user,el)){
        return {
          Id: el.id,
          End: new Date(el.endTime),
          Start: new Date(el.startTime),
          Summary: el.title,
          IsReadonly: checkUser(user,el),
          //isAllDay: true,
          Description: el.body
        };}
        else
        return {}
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
        : "Not specified",
      category: "Not specified",
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
  /*---------------------
  */
  const deleteEvent = (args) => {
    console.log("what happen? ", args.addedRecords[0]);
    const data = {
      body: args.deletedRecords[0].Description
        ? args.deletedRecords[0].Description
        : "Not specified",
      category: "Not specified",
      date: new Date().toISOString(),
      endTime: new Date(
        args.deletedRecords[0].End
          ? args.deletedRecords[0].End
          : args.deletedRecords[0].EndTime
      ).toISOString(),
      id: args.deletedRecords[0].Id,
      senderEmail: user.email,
      senderId: user.id,
      senderfName: user.fName,
      senderlName: user.lName,
      startTime: new Date(
        args.deletedRecords[0].Start
          ? args.deletedRecords[0].Start
          : args.deletedRecords[0].StartTime
      ).toISOString(),
      title: args.deletedRecords[0].Summary
        ? args.deletedRecords[0].Summary
        : args.deletedRecords[0].Subject,
      description: args.deletedRecords[0].Description,
    };
    console.log("Data after added: ", data);

    // post data API here
    
    const delEvent = (id, category) => {
      deleteEventAsync(id, category).then((res) => {
        // creates a new state without the deleted object
        if (res.status === 200) {
          // removes event if
          setSnackbar("Deleted event succesfully", 3, 2000);
        } else if (res.status === 400) {
          setSnackbar("Response returned status 400, cannot delete", 0, 2000);
          console.log("ERROR status:", res.status);
        } else {
          setSnackbar(
            "Something went wrong deleting event, status: ",
            res.status,
            1,
            2000
          );
          console.log("ERROR STATUS", res.status);
        }
      });
    };
    delEvent(data.id, data.category);

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
          if (args.requestType === "eventRemoved" &&
          args.addedRecords != null )
          {
            deleteEvent(args);
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
