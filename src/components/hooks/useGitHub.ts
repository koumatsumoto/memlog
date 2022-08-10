import GitHubStorage from "@koumatsumoto/github-storage";
import { selector, useRecoilValue } from "recoil";
import { AppStorage, notifyError, notifySuccess } from "../shared";

let githubStorage: GitHubStorage;
const getGitHubStorage = () => {
  if (githubStorage) {
    return githubStorage;
  }

  githubStorage = new GitHubStorage({
    token: AppStorage.loadAccessToken() ?? "",
    repository: "memlog-storage",
  });

  // for debug
  (window as any)["GitHubStorage"] = githubStorage;
  return githubStorage;
};

const userInformationQuery = selector({
  key: "userInformationQuery",
  get: async () => await getGitHubStorage().userinfo(),
});

const userFileHistoryQuery = selector({
  key: "userFileHistoryQuery",
  get: async ({ getCallback }) => {
    const data = await getGitHubStorage()
      .load({ count: 6 })
      .catch((e) => {
        console.error("[app] userFileHistoryQuery", e);
        return [];
      });
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

export const createCommit = ({ title = "", text = "", tags = [] }: { title?: string; text?: string; tags?: string[] }) =>
  getGitHubStorage()
    .save({ title, text, tags })
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
