import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import App from "./App";
import { fetchNewAccessToken } from "./auth/fetchNewAccessToken";
import { login } from "./auth/helpers";
import getWatchedMutationLink from "./watchMutationLink";
import "./index.css";

const realApi = "http://stokes-graveyard.cf/graphql";
const devApi = "http://localhost:3000/graphql";

const httpLink = new HttpLink({ uri: realApi });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("access-token") || "";
  if (token === "null" || token === "undefined") return { headers: headers };
  if (token) {
    return {
      headers: {
        ...headers,
        Authorization: token
      }
    };
  }
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ extensions }) => {
        if (extensions && extensions.code) {
          if (extensions.code === "UNAUTHENTICATED") {
            const refreshToken = localStorage.getItem("refresh-token");
            const accessToken = localStorage.getItem("access-token");
            if (!refreshToken || !accessToken) return forward(operation);
            const token = fetchNewAccessToken(refreshToken)
              .then(t => {
                login(refreshToken, t, {});
                return t;
              })
              .catch(e => {
                console.error(e);
                forward(operation);
              });
            operation.setContext(({ headers = {} }) => ({
              headers: {
                ...headers,
                Authorization: token || headers.Authorization || undefined
              }
            }));
            return forward(operation);
          } else if (extensions.code === "UNAUTHORIZED") {
            return;
          }
        }
      });
    }
  }
);

const cache = new InMemoryCache();

const watchedMutationLink = getWatchedMutationLink(cache);

const client = new ApolloClient({
  link: ApolloLink.from([authLink, watchedMutationLink, errorLink, httpLink]),
  cache
});

const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<AppWithProvider />, document.getElementById("root"));
