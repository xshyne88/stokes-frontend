import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Home from "./Home";
import Admin from "./Admin";
import Header from "./Header";
import { AuthProvider } from "./AuthProvider";
import Logout from "./Logout";

// heroku comment

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/admin" component={Admin} />
      </AuthProvider>
    </Router>
  );
};

export default App;
