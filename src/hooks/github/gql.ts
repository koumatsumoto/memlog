import { graphql } from '@octokit/graphql';
import { ValueOf } from 'ts-essentials';

const USER_INFORMATION = `
  query GetUserInformation($repositoryName: String!) {
    viewer {
      login
      name
      avatarUrl
      repository(name: $repositoryName) {
        nameWithOwner
        defaultBranchRef {
          name
          target {
            ... on Commit {
              history(first: 30) {
                nodes {
                  message
                }
              }
            }
          }
        }
      }
    }
  }
` as const;

const REPOSITORY_LAST_COMMIT_ID = `
  query GetRepositoryLastCommitId($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      defaultBranchRef {
        name
        target {
          ... on Commit {
            oid
          }
        }
      }
    }
  }
` as const;

const GET_FILE_CONTENT = `
  query GetRepositoryFile($owner: String!, $name: String!, $expression: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: $expression) {
        ... on Blob {
          byteSize
          text
        }
      }
    }
  }
` as const;

const CREATE_COMMIT = `
  mutation CreateCommit($input: CreateCommitOnBranchInput!) {
    createCommitOnBranch(input: $input) {
      commit {
        url
      }
    }
  }
` as const;

export const GQL = {
  USER_INFORMATION,
  REPOSITORY_LAST_COMMIT_ID,
  GET_FILE_CONTENT,
  CREATE_COMMIT,
};

type GQLInterface = {
  Query: {
    USER_INFORMATION: {
      Query: typeof USER_INFORMATION;
      Params: {
        repositoryName: string;
      };
      Data: {
        viewer: {
          login: string;
          name: string;
          avatarUrl: string;
          repository: {
            nameWithOwner: string;
            defaultBranchRef: {
              name: string;
              target: {
                history: { message: string }[];
              };
            };
          };
        };
      };
    };
    REPOSITORY_LAST_COMMIT_ID: {
      Query: typeof REPOSITORY_LAST_COMMIT_ID;
      Params: {
        owner: string;
        name: string;
      };
      Data: {
        repository: {
          defaultBranchRef: {
            name: string;
            target: {
              oid: string;
            };
          };
        };
      };
    };
    GET_FILE_CONTENT: {
      Query: typeof GET_FILE_CONTENT;
      Params: {
        owner: string;
        name: string;
        expression: string;
      };
      Data: {
        repository: {
          defaultBranchRef: {
            name: string;
            target: {
              oid: string;
            };
          };
        };
      };
    };
  };
  Mutation: {
    CREATE_COMMIT: {
      Mutation: typeof CREATE_COMMIT;
      Params: {
        branch: { repositoryNameWithOwner: string; branchName: string };
        expectedHeadOid: string;
        message: { headline: string };
        fileChanges: { additions: [{ path: string; contents: string }] };
      };
      Data: {
        repository: {
          defaultBranchRef: {
            name: string;
            target: {
              oid: string;
            };
          };
        };
      };
    };
  };
};

export type GQLQueries = ValueOf<GQLInterface['Query']>['Query'];
export type GQLQueryParams<Query extends string> = ValueOf<{
  [K in keyof GQLInterface['Query']]: Query extends GQLInterface['Query'][K]['Query'] ? GQLInterface['Query'][K]['Params'] : never;
}>;
export type GQLQueryData<Query extends string> = ValueOf<{
  [K in keyof GQLInterface['Query']]: Query extends GQLInterface['Query'][K]['Query'] ? GQLInterface['Query'][K]['Data'] : never;
}>;

export type GQLMutations = ValueOf<GQLInterface['Mutation']>['Mutation'];
export type GQLMutationParams<Query extends string> = ValueOf<{
  [K in keyof GQLInterface['Mutation']]: Query extends GQLInterface['Mutation'][K]['Mutation'] ? GQLInterface['Mutation'][K]['Params'] : never;
}>;
export type GQLMutationData<Query extends string> = ValueOf<{
  [K in keyof GQLInterface['Mutation']]: Query extends GQLInterface['Mutation'][K]['Mutation'] ? GQLInterface['Mutation'][K]['Data'] : never;
}>;

export const query = <Query extends GQLQueries, Params = GQLQueryParams<Query>>(gql: Query, params: Params & { headers: Record<string, string> }): Promise<GQLQueryData<Query>> => graphql(gql, params);
export const mutation = <Mutation extends GQLMutations, Params = GQLMutationParams<Mutation>>(gql: Mutation, params: Params & { headers: Record<string, string> }): Promise<GQLMutationData<Mutation>> => graphql(gql, params);
