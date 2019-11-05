import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import { AuthContext } from "./context/auth";
import Home from './Home';
import Header from './Header';

const App = () => {
    return (
        <AuthContext.Provider value={false}>
            <Router>
                <Header />
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <PrivateRoute exact path="/admin" />
            </Router>
        </AuthContext.Provider>
  );
};

export default App;

