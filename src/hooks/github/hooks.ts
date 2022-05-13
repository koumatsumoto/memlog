import { format } from 'date-fns';
import { toBase64 } from '../../utils';
import { storage } from '../storage';
import { toSuspenseLoader, useLoadingState } from '../utils';
import { GQL, mutation, query } from './gql';

// ファイルを一覧表示しやすいようにフォルダの階層は1つとする
const memlogStorageFileName = (time = new Date()) => format(time, `yyyyMM/${time.getTime()}`);
export const getAuthHeader = () => ({ authorization: `Bearer ${storage.loadAccessToken()}` });

export const useCreateCommitMutation = () => {
  return useLoadingState(async ({ owner, repositoryName, contents }: { owner: string; repositoryName: string; contents: string }) => {
    const { repository } = await query(GQL.REPOSITORY_LAST_COMMIT_ID, { owner: owner, name: repositoryName, headers: getAuthHeader() });
    const filename = memlogStorageFileName();
    const input = {
      branch: { repositoryNameWithOwner: `${owner}/${repositoryName}`, branchName: repository.defaultBranchRef.name },
      expectedHeadOid: repository.defaultBranchRef.target.oid,
      message: { headline: filename }, // コミットメッセージの1行目はファイル名する。これはAPIから取得するコミット履歴から該当ファイルを特定できるようにするため。
      fileChanges: { additions: [{ path: filename, contents: toBase64(contents) }] },
    };
    return await mutation(GQL.CREATE_COMMIT, { input, headers: getAuthHeader() });
  });
};

export const userinfoLoader = toSuspenseLoader(query(GQL.USER_INFORMATION, { repositoryName: 'memlog-storage', headers: getAuthHeader() }));
