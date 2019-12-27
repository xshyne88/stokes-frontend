import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./auth/Login";
import HomeMap from "./map/HomeMap";
import History from "./admin/History";
import { AuthProvider } from "./auth/AuthProvider";
import Logout from "./auth/Logout";
import Users from "./account/Users";
import Areas from "./areas/Areas";
import AreaDetails from "./areas/AreaDetails";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/map" component={HomeMap} />
        <PrivateRoute exact path="/areas/:id" component={AreaDetails} />
        <PrivateRoute exact path="/areas" component={Areas} />
        <PrivateRoute exact path="/history" component={History} />
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/logout" component={Logout} />
        {/* <Route component={NoMatch} /> */}
      </AuthProvider>
    </Router>
  );
};

export default App;
