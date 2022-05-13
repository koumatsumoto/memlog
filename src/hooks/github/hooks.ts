import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { toBase64 } from '../../utils';
import { storage } from '../storage';
import { mutateCreateCommitOnBranch, queryLastCommitOid, queryUserInformation } from './gql';

const getMemlogStorageFileName = (time = new Date()) => {
  // ファイルを一覧表示しやすいようにフォルダの階層は1つとする
  return format(time, `yyyyMM/${time.getTime()}`);
};

const getAuthorizationHeader = () => {
  const token = storage.loadAccessToken();

  return { authorization: `Bearer ${token}` };
};

export const useUserProfileQuery = () => {
  const [result, setResult] = useState<{ loading: boolean; data: any; error: unknown }>({ loading: true, data: undefined, error: undefined });

  useEffect(() => {
    queryUserInformation({ headers: getAuthorizationHeader(), repositoryName: 'memlog-storage' })
      .then((data) => setResult({ loading: false, data, error: undefined }))
      .catch((error) => setResult({ loading: false, data: undefined, error }));
  }, []);

  return result;
};

export const useCreateCommitMutation = () => {
  const [result, setResult] = useState<{ loading: boolean; data: any; error: unknown }>({ loading: false, data: undefined, error: undefined });
  const execute = useCallback(
    async ({ owner, repositoryName, contents }: { owner: string; repositoryName: string; contents: string }) => {
      const headers = getAuthorizationHeader();
      setResult({ loading: true, data: undefined, error: undefined });
      const { repository } = await queryLastCommitOid({ headers, owner: owner, name: repositoryName });

      const filename = getMemlogStorageFileName();
      await mutateCreateCommitOnBranch({
        headers,
        input: {
          branch: { repositoryNameWithOwner: `${owner}/${repositoryName}`, branchName: repository.defaultBranchRef.name },
          expectedHeadOid: repository.defaultBranchRef.target.oid,
          message: { headline: filename }, // コミットメッセージの1行目はファイル名する。これはAPIから取得するコミット履歴から該当ファイルを特定できるようにするため。
          fileChanges: { additions: [{ path: getMemlogStorageFileName(), contents: toBase64(contents) }] },
        },
      })
        .then((data) => setResult({ loading: false, data, error: undefined }))
        .catch((error) => setResult({ loading: false, data: undefined, error }));
    },
    [setResult],
  );

  return [execute, result] as const;
};
