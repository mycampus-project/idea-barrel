import { React, useState, useEffect,useContext } from "react";
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


const { fetchEventsAsync,fetchUsersAsync } = BackendAPI();

const CalendarPage = () => {
  const { user} = useContext(UserContext); // eslint-disable-line
    const [ setUsers] = useState([]); 

  const [localData, setLocalData] = useState(null)


  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsersAsync();
        setUsers(response);
        console.log("Users:")
        console.log(response);
      } catch (e) {
        console.log("error fetching users");
        console.log(e);
      }
    };
    const getEvents = async () => {
      try {
        const response = await fetchEventsAsync();
        console.log("user: ", user.fName, user.lName);
        console.log("response :", response);
        let temp = [...response];
        temp = temp.map((el) => {
          return {
            Id: el._rid,
            End: new Date(el.endTime),
            Start: new Date(el.startTime),
            Summary: el.title,
            IsReadonly: true
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
    getUsers();
    getEvents();
  }, []); // eslint-disable-line

  return (
    <div>
      <ScheduleComponent currentView="WorkWeek" eventSettings={localData} >
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
