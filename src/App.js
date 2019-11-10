import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./auth/Login";
import HomeMap from "./map/HomeMap";
import Admin from "./admin/Admin";
import Header from "./headerfooter/Header";
import { AuthProvider } from "./auth/AuthProvider";
import Logout from "./auth/Logout";
import BottomNavigation from "./headerfooter/BottomNavigation";
import NoMatch from "./routes/NoMatch";
import Account from "./account/Account";
import Areas from "./areas/Areas";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <PrivateRoute exact path="/map" component={HomeMap} />
          <PrivateRoute exact path="/areas" component={Areas} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <PrivateRoute exact path="/account" component={Account} />
          <Route component={NoMatch} />
        </Switch>
        <BottomNavigation />
      </AuthProvider>
    </Router>
  );
};

export default App;
