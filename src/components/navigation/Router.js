import React from "react";

import BulletinPage from "../../pages/BulletinPage";
import EventsPage from "../../pages/EventsPage";
import IdeaBarrelPage from "../../pages/IdeaBarrelPage";
import HomePage from "../../pages/HomePage";

import { useRoutes } from "hookrouter";

const routes = {
  "/": () => <HomePage />,
  "/bulletin": () => <BulletinPage />,
  "/events": () => <EventsPage />,
  "/idea-barrel": () => <IdeaBarrelPage />,
};

const Router = () => {
  const routeResult = useRoutes(routes);

  return routeResult;
};

export default Router;
