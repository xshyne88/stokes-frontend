import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import { AuthContext } from "./context/auth";
import Home from './Home';

const App = () => {
    return (
        <AuthContext.Provider value={false}>
            <Router>
                <div>Stokes Header</div>
                <Route exact path="/" component={Home}/>
                <PrivateRoute exact path="/admin" />
            </Router>
        </AuthContext.Provider>
  );
};

export default App;

