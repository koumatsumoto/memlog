import { ApolloClient, gql, HttpLink, InMemoryCache, useQuery, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { useState } from 'react';
import { reloadToTopPage } from './auth';
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

const setAuthorizationLink = setContext(() => ({
  headers: { authorization: `Bearer ${storage.loadAccessToken()}` },
}));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);

    // maybe AccessToken expired
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      storage.resetAccessToken();
      reloadToTopPage();
    }
  }
});

export const useGitHubApolloClient = () => {
  const [client] = useState(
    new ApolloClient({
      cache: new InMemoryCache(),
      link: from([errorLink, setAuthorizationLink, httpLink]),
    }),
  );

  return client;
};

export const useGitHubUserProfile = (token: string) => {
  return useQuery(GET_PROFILE, { context: { headers: { authorization: `Bearer ${token}` } } });
};
