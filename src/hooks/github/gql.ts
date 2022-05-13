import { graphql } from '@octokit/graphql';

export const queryUserInformation = async (params: { headers: Record<string, string>; repositoryName: string }): Promise<{ data: { viewer: { login: string; name: string; avatarUrl: string } } }> => {
  return graphql(
    `
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
    `,
    params,
  );
};

export const queryLastCommitOid = async (params: {
  headers: Record<string, string>;
  owner: string;
  name: string;
}): Promise<{ repository: { defaultBranchRef: { name: string; target: { oid: string } } } }> => {
  return graphql(
    `
      query GetLastCommitOid($owner: String!, $name: String!) {
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
    `,
    params,
  );
};

type CreateCommitOnBranchInput = {
  branch: { repositoryNameWithOwner: string; branchName: string };
  message: { headline: string };
  fileChanges: { additions: [{ path: string; contents: string }] };
  expectedHeadOid: string;
};
export const mutateCreateCommitOnBranch = async (params: { headers: Record<string, string>; input: CreateCommitOnBranchInput }) => {
  return graphql(
    `
      mutation CreateCommit($input: CreateCommitOnBranchInput!) {
        createCommitOnBranch(input: $input) {
          commit {
            url
          }
        }
      }
    `,
    params,
  );
};

export const queryRepositoryCommits = async (params: {
  headers: Record<string, string>;
  owner: string;
  name: string;
}): Promise<{ repository: { defaultBranchRef: { name: string; target: { oid: string } } } }> => {
  return graphql(
    `
      query GetLastCommitOid($owner: String!, $name: String!) {
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
    `,
    params,
  );
};
