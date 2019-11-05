import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import './index.css';
import App from './App';

const fakeData = "https://api.graph.cool/simple/v1/swapi"
// const realApi = "localhost:3000/graphql";

const client = new ApolloClient({
  link: new HttpLink({ fakeData }),
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