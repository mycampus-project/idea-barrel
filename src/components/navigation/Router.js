import React from "react";

import BulletinPage from "../../pages/BulletinPage";
import EventsPage from "../../pages/EventsPage";
import IdeaBarrelPage from "../../pages/IdeaBarrelPage";
import HomePage from "../../pages/HomePage";
import CreateBulletinPage from "../../pages/CreateBulletinPage"
import BulletinDetailsPage from "../../pages/BulletinDetailsPage"

import { useRoutes } from "hookrouter";

const routes = {
  "/": () => <HomePage />,
  "/bulletin": () => <BulletinPage />,
  "/bulletin/:id": ({id}) => <BulletinDetailsPage id={id}/>,
  "/events": () => <EventsPage />,
  "/idea-barrel": () => <IdeaBarrelPage />,
  "/bulletin-create":() => <CreateBulletinPage/>
};

const Router = () => {
  const routeResult = useRoutes(routes);

  return routeResult;
};

export default Router;
