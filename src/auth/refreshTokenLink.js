import { ApolloLink, Observable } from 'apollo-link';
import { getCurrentUser } from '../utils/getCurrentUser';
import { fetchNewAccessToken } from './fetchNewAccessToken';
import { login } from './helpers';

// Attempt to refetch and access token using the fresh.  If successful, attempt failed
// operation again with new headers
// @see https://stackoverflow.com/questions/50965347/how-to-execute-an-async-fetch-request-and-then-retry-last-failed-request
const attemptApolloRefresh = (
  operation,
  forward
) => {
  const refreshToken = localStorage.getItem('refresh-token');
  const accessToken = localStorage.getItem('access-token');
  const user = getCurrentUser();
  if (!refreshToken || !accessToken || !user) return undefined;

  return new Observable(observer => {
    fetchNewAccessToken(refreshToken)
      .then(freshAccessToken => {
        if (freshAccessToken) {
          login(refreshToken, freshAccessToken, user);
        }

        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            Authorization:
              freshAccessToken || headers.Authorization || undefined,
          },
        }));
      })
      .then(() => {
        const subscriber = {
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        };
        forward(operation).subscribe(subscriber);
      })
      .catch(error => {
        observer.error(error);
      });
  });
};

export const tokenRefreshLink = new ApolloLink((operation, forward) => {
  const { attemptRefresh } = operation.getContext();
  if (attemptRefresh) {
    const refreshedOperation = attemptApolloRefresh(operation, forward);
    if (refreshedOperation) return refreshedOperation;
  }

  return forward(operation);
});
