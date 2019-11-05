import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { client } from './base/apollo';
import { renderRoutes } from 'react-router-config';
import { routes } from './base/routes';
import { AuthProvider } from './AuthProvider';

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
        <Router>
          <AuthProvider>{renderRoutes(routes)}</AuthProvider>
        </Router>
    </ApolloProvider>
  );
};