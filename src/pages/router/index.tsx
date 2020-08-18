import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from  '../blogIndex/index'

export default function RouterIndex() {
  return (
    <Router>
       {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
          </Route>
          <Route path="/users">
          </Route>
          <Route path="/">
                <App/>
          </Route>
        </Switch>
    </Router>
  );
}