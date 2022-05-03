import { ApolloClient, from, gql, HttpLink, InMemoryCache, useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { replaceLocationWithTopPage } from './auth';
import { storage } from './storage';

const GET_PROFILE = gql`
  query {
    viewer {
      login
      name
      url
      avatarUrl
    }
  }
`;

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
});

const setAuthorizationLink = setContext(() => {
  const token = storage.loadAccessToken();

  return {
    headers: { authorization: `Bearer ${token}` },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    // maybe AccessToken expired
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      storage.resetAccessToken();
      replaceLocationWithTopPage();
    }
  }
});

export const createGitHubApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, setAuthorizationLink, httpLink]),
  });
};

export const useGitHubUserProfile = () => {
  return useQuery(GET_PROFILE);
};
