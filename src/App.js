import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Home from './Home';
import Header from './Header';
import { AuthProvider } from './AuthProvider';

const App = () => {
    return (
              <Router>
                    <AuthProvider>
                        <Header />
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <PrivateRoute exact path="/admin" />
                    </AuthProvider>
              </Router>
  );
};

export default App;

