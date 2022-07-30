import GitHubStorage from '@koumatsumoto/github-storage';
import { selector } from 'recoil';
import { toBase64 } from '../../utils';
import { storage } from '../storage';
import { useLoadingState } from '../utils';

let githubStorage: GitHubStorage;
const getGitHubStorage = () => {
  if (githubStorage) {
    return githubStorage;
  }

  return (githubStorage = new GitHubStorage({
    token: storage.loadAccessToken() ?? '',
    repository: 'memlog-storage',
  }));
};

export const useCreateCommit = () => {
  return useLoadingState(({ contents }: { contents: string }) => {
    return getGitHubStorage().save({ text: toBase64(contents) });
  });
};

export const userInformationQuery = selector({
  key: 'userInformationQuery',
  get: async () => await getGitHubStorage().userinfo(),
});

export const userFileHistoryQuery = selector({
  key: 'userFileHistoryQuery',
  get: async () => {
    return await getGitHubStorage().load({ count: 10 });
  },
});
