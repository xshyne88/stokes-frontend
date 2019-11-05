import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import App from './App';

const realApi = "http://localhost:3000/graphql";

const httpLink = new HttpLink({ uri: realApi });

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('access-token') || '';
    return {
        headers: {
            ...headers,
            Authorization: token,
        },
    };
});

const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path, extensions }) => {
                if (extensions && extensions.code) {
                    if (extensions.code === 'UNAUTHENTICATED') {
                        operation.setContext({ attemptRefresh: true });
                        return forward(operation);
                    } else if (extensions.code === 'UNAUTHORIZED') {
                        return;
                    }
                }
            })
        }
    }
);

const client = new ApolloClient({
    link: ApolloLink.from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  request: (operation) => {
      console.log('setting operations ...')
  const token = localStorage.getItem('stokesToken')
    operation.setContext({
      headers: {
        Authorization: token ? token : ''
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
