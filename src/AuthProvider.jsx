import React from 'react';
import { useHistory } from 'react-router-dom';
import { isAccessTokenValid } from './auth/helpers';
import { UserProvider } from './UserProvider';

export const AuthProvider = ({ children }) => {
    const history = useHistory();

    const handleLogout = () => history.push('/login');
   console.log('here');
    return (
        <UserProvider
            onLogout={handleLogout}
            isAuthenticated={isAccessTokenValid()}
        >
            {children}
        </UserProvider>
    );
};
