import { gql, useQuery } from '@apollo/client';

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

export const useGitHubUserProfile = (token: string) => {
  return useQuery(GET_PROFILE, { context: { headers: { authorization: `Bearer ${token}` } } });
};
