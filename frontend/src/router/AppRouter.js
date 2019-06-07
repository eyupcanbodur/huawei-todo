import React from "react";
import MainPage from "../pages/MainPage";
import TodoPage from "../pages/TodoPage";
import NotFoundPage from "../pages/NotFoundPage";
import { Route, Switch } from "react-router-dom";
function AppRouter() {
  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/todo" component={TodoPage} />,
      {/* <Route path="/main" exact component={MainPage} /> */}
      <Route component={NotFoundPage} />,
    </Switch>
  );
}

export default AppRouter;
