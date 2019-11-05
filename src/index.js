import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import App from './App';

const realApi = "http://localhost:3000/graphql";

const client = new ApolloClient({
    link: new HttpLink({ uri: realApi }),
    cache: new InMemoryCache(),
  request: (operation) => {
  const token = localStorage.getItem('stokesToken')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})

const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<AppWithProvider />, document.getElementById('root'));
