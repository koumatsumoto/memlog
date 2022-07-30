import { atom, atomFamily, selector, useRecoilValue } from 'recoil';
import { isTruthy } from 'remeda';
import { match, P } from 'ts-pattern';
import { getUrlQueryParams, isNonEmptyString, prettyJson } from '../utils';
import { replaceLocationWithTopPage, requestAccessTokenAndSaveToStorage } from './auth';
import { storage } from './storage';

const startUrlState = atom({ key: 'startUrlState', default: window.location.href });
const urlQueryParams = atom({ key: 'urlQueryParams', default: getUrlQueryParams() });

const gitHubAuthCode = selector({ key: 'gitHubAuthCode', get: ({ get }) => isNonEmptyString(get(urlQueryParams)) });
const gitHubAuthenticationState = atomFamily<{ code?: string; startTime?: number; endTime?: number }, { code?: string }>({
  key: 'gitHubAuthenticationJob',
  default: {},
  effects: ({ code }) => [
    ({ setSelf }) => {
      if (isTruthy(code)) {
        const startTime = Date.now();
        setSelf({ code, startTime });
        requestAccessTokenAndSaveToStorage(code)
          .then(() => setSelf({ code, startTime, endTime: Date.now() }))
          .catch((e) => alert(prettyJson(e)))
          .finally(() => replaceLocationWithTopPage());
      }
    },
  ],
});

const githubAccessToken = atom({ key: 'githubAccessToken', default: storage.loadAccessToken() });
const hasGitHubAccessToken = selector({ key: 'hasGitHubAccessToken', get: ({ get }) => isNonEmptyString(get(githubAccessToken)) });

export const state = {
  urlQueryParams,
  gitHubAuthCode,
  gitHubAuthenticationState,
  githubAccessToken,
  hasGitHubAccessToken,
} as const;

export const useAppInitialState = () => {
  /**
   * URLパラメータからアプリの起動種別を判定する
   *   1. `code` のパラメータがある場合はOAuth認証後のリダイレクト
   *   2. `title`, `text` のパラメータがある場合はShareTargetApiによる呼び出し
   *   3. パラメータがない場合は、通常起動
   */
  const startUrl = useRecoilValue(startUrlState);
  const urlParams = useRecoilValue(state.urlQueryParams) as { code?: string; title?: string; text?: string };
  const appOpenedBy = match(urlParams)
    .with({ code: P.string }, () => 'StartedWithOAuthRedirect' as const)
    .with({ title: P.string, text: P.string }, () => 'StartedWithSharedTargetAPI' as const)
    .otherwise(() => 'StartedWithUser' as const);

  /**
   * 以前にOAuth認証が完了してアクセスキーを発行している場合はStorageにキャッシュを保存しているため、それを確認する
   *   - TODO: validation
   */
  const accessToken = useRecoilValue(state.githubAccessToken);
  const hasAccessToken = Boolean(accessToken);

  return {
    startUrl,
    urlParams,
    appOpenedBy,
    accessToken,
    hasAccessToken,
  } as const;
};
