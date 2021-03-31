import React from "react";
import BulletinPage from "../../pages/BulletinPage";
import EventsPage from "../../pages/EventsPage";
import IdeaBarrelPage from "../../pages/IdeaBarrelPage";
import HomePage from "../../pages/HomePage";
import CalendarPage from "../../pages/CalendarPage.js";
import CreateBulletinPage from "../../pages/CreateBulletinPage"
import CreateEventPage from "../../pages/CreateEventPage"
import { useRoutes } from "hookrouter";

const routes = {
  "/": () => <HomePage />,
  "/bulletin": () => <BulletinPage />,
  "/events": () => <EventsPage />,
  "/idea-barrel": () => <IdeaBarrelPage />,
  "/calendar": () => <CalendarPage />,
  "/bulletin-create": () => <CreateBulletinPage/>,
  "/event-create": () => <CreateEventPage/>
};

const Router = () => {
  const routeResult = useRoutes(routes);

  return routeResult;
};

export default Router;