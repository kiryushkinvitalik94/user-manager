import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import User from "./User";

export default function index() {
  return (
    <Router>
      <Switch>
        <Route path="/user:id">
          <User />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
