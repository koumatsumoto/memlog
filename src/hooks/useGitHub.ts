import GitHubStorage from '@koumatsumoto/github-storage';
import { selector, useRecoilValue } from 'recoil';
import { AppStorage } from './AppStorage';
import { useLoadingState } from './utils';

let githubStorage: GitHubStorage;
const getGitHubStorage = () => {
  if (githubStorage) {
    return githubStorage;
  }

  return (githubStorage = new GitHubStorage({
    token: AppStorage().loadAccessToken() ?? '',
    repository: 'memlog-storage',
  }));
};

const userInformationQuery = selector({
  key: 'userInformationQuery',
  get: async () => await getGitHubStorage().userinfo(),
});

const userFileHistoryQuery = selector({
  key: 'userFileHistoryQuery',
  get: async () => {
    return await getGitHubStorage().load({ count: 10 });
  },
});

export const useGitHub = () => {
  const userinfo = useRecoilValue(userInformationQuery);
  const historyFiles = useRecoilValue(userFileHistoryQuery);
  const [createCommit, createCommitResult] = useLoadingState(({ contents }: { contents: string }) => {
    return getGitHubStorage().save({ text: contents });
  });

  return {
    userinfo,
    historyFiles,
    createCommit,
    createCommitResult,
  } as const;
};
