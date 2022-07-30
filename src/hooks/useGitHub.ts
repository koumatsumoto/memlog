import GitHubStorage from '@koumatsumoto/github-storage';
import { selector, useRecoilValue } from 'recoil';
import { AppStorage } from './AppStorage';
import { notifyError, notifySuccess } from './Toast';

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
  get: async ({ getCallback }) => {
    const data = await getGitHubStorage().load({ count: 8 });
    const reload = getCallback(({ refresh }) => () => {
      refresh(userFileHistoryQuery);
    });

    return { data, reload } as const;
  },
});

export const useUserinfo = () => {
  const userinfo = useRecoilValue(userInformationQuery);

  return { userinfo } as const;
};

export const createCommit = (params: { text: string }) =>
  getGitHubStorage()
    .save(params)
    .then(({ lastCommitId }) => {
      notifySuccess(`commit created, #${lastCommitId.slice(0, 8)}`);
    })
    .catch((error) => {
      notifyError(`commit failed with an error, ${error}`);
      throw error;
    });

export const useCommitHistory = () => {
  const { data: history, reload: reloadHistory } = useRecoilValue(userFileHistoryQuery);

  return {
    history,
    reloadHistory,
  } as const;
};
