import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import HomeMap from "./HomeMap";
import Admin from "./Admin";
import Header from "./Header";
import { AuthProvider } from "./AuthProvider";
import Logout from "./Logout";
import BottomNavigation from "./BottomNavigation";
import "./App.css";
import NoMatch from "./NoMatch";

// heroku comment

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route component={NoMatch} />
        </Switch>
        <PrivateRoute exact path="/map" component={HomeMap} />
        <PrivateRoute exact path="/admin" component={Admin} />
        <PrivateRoute exact path="/account" component={HomeMap} />
        <PrivateRoute exact path="/admin" component={Admin} />
        <BottomNavigation />
      </AuthProvider>
    </Router>
  );
};

export default App;
