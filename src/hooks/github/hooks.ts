import { graphql } from '@octokit/graphql';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { toBase64 } from '../../utils';
import { storage } from '../storage';
import { GQL, GQLMutationData, GQLMutationParams, GQLMutations, GQLQueries, GQLQueryData, GQLQueryParams, mutation, query } from './gql';

// ファイルを一覧表示しやすいようにフォルダの階層は1つとする
const memlogStorageFileName = (time = new Date()) => format(time, `yyyyMM/${time.getTime()}`);
export const getAuthHeader = () => ({ authorization: `Bearer ${storage.loadAccessToken()}` });

type UseQueryResult<Data> = { loading: true; data: undefined; error: undefined } | { loading: false; data: Data; error: undefined } | { loading: false; data: undefined; error: Error };
export const useQuery = <T extends GQLQueries>(query: T, params: GQLQueryParams<T>, options: { suspense?: boolean } = {}) => {
  const [result, setResult] = useState<UseQueryResult<GQLQueryData<T>>>({ loading: true, data: undefined, error: undefined });

  useEffect(() => {
    graphql(query, { ...params, headers: getAuthHeader() })
      .then((data) => setResult({ loading: false, data: data as any, error: undefined }))
      .catch((error) => setResult({ loading: false, data: undefined, error: error instanceof Error ? error : new Error(error) }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return result;
};

type UseMutationResult<Data> = { loading: boolean; data: undefined; error: undefined } | { loading: false; data: Data; error: undefined } | { loading: false; data: undefined; error: Error };
export const useMutation = <T extends GQLMutations, Params = GQLMutationParams<T>>(gql: GQLMutations) => {
  const [result, setResult] = useState<UseMutationResult<GQLMutationData<T>>>({ loading: false, data: undefined, error: undefined });
  const fn = useCallback(
    async (params: Params) => {
      setResult({ loading: true, data: undefined, error: undefined });
      await mutation(gql, { ...params, headers: getAuthHeader() })
        .then((data) => setResult({ loading: false, data: data as any, error: undefined }))
        .catch((error) => setResult({ loading: false, data: undefined, error }));
    },
    [setResult],
  );

  return [fn, result] as const;
};

export const useCreateCommitMutation = () => {
  const [result, setResult] = useState<{ loading: boolean; data: any; error: unknown }>({ loading: false, data: undefined, error: undefined });
  const fn = useCallback(
    async ({ owner, repositoryName, contents }: { owner: string; repositoryName: string; contents: string }) => {
      setResult({ loading: true, data: undefined, error: undefined });
      const { repository } = await query(GQL.REPOSITORY_LAST_COMMIT_ID, { owner: owner, name: repositoryName, headers: getAuthHeader() });
      const filename = memlogStorageFileName();
      const input = {
        branch: { repositoryNameWithOwner: `${owner}/${repositoryName}`, branchName: repository.defaultBranchRef.name },
        expectedHeadOid: repository.defaultBranchRef.target.oid,
        message: { headline: filename }, // コミットメッセージの1行目はファイル名する。これはAPIから取得するコミット履歴から該当ファイルを特定できるようにするため。
        fileChanges: { additions: [{ path: filename, contents: toBase64(contents) }] },
      };
      await mutation(GQL.CREATE_COMMIT, { input, headers: getAuthHeader() })
        .then((data) => {
          setResult({ loading: false, data: data as any, error: undefined });
        })
        .catch((error) => {
          setResult({ loading: false, data: undefined, error: error instanceof Error ? error : new Error(error) });
        });
    },
    [setResult],
  );

  return [fn, result] as const;
};

export const useUserInformation = () => {
  const { loading, error, data } = useQuery(GQL.USER_INFORMATION, { repositoryName: 'memlog-storage' });

  useQuery(GQL.GET_FILE_CONTENT, { owner: 'kouMatsumoto', name: 'memlog-storage', expression: 'main:202205/1652463421522' });
};
