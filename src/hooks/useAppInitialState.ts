import { useCallback, useMemo } from 'react';
import { selector, useRecoilValue } from 'recoil';
import { match, P } from 'ts-pattern';
import { prettyJson } from '../utils';
import { AppStorage } from './AppStorage';
import { replaceLocationWithTopPage, requestAccessTokenAndSaveToStorage } from './useAuth';
import { createCommit } from './useGitHub';

const startUrlState = selector({
  key: 'startUrlState',
  get: () => window.location.href,
});

const startUrlParamsState = selector({
  key: 'startUrlParamsState',
  get: () => getUrlQueryParams(window.location.search),
});

// useStateの管理ではどうしても開発時に多重実行されてしまうためグローバル変数でフラグ管理する
let appInitializeEffectCompleted = false;

export const useAppInitialState = () => {
  /**
   * URLパラメータからアプリの起動種別を判定する
   *   1. `code` のパラメータがある場合はOAuth認証後のリダイレクト
   *   2. `title`, `text` のパラメータがある場合はShareTargetApiによる呼び出し
   *   3. パラメータがない場合は、通常起動
   */
  const startUrl = useRecoilValue(startUrlState);
  const urlParams = useRecoilValue(startUrlParamsState);
  const appOpenedBy = match(urlParams)
    .with({ code: P.string }, () => 'OAuthRedirect' as const)
    .with({ title: P.string, text: P.string }, () => 'SharedTargetAPI' as const)
    .otherwise(() => 'User' as const);

  /**
   * 以前にOAuth認証が完了してアクセスキーを発行している場合はStorageにキャッシュを保存しているため、それを確認する
   *   - TODO: validation
   */
  const accessToken = useMemo(() => AppStorage().loadAccessToken(), []);
  const hasAccessToken = Boolean(accessToken);

  const onceInitializeApp = useCallback(() => {
    if (appInitializeEffectCompleted) {
      return;
    }
    appInitializeEffectCompleted = true;

    // OAuth Redirect
    if (urlParams.code) {
      requestAccessTokenAndSaveToStorage(urlParams.code)
        .catch((e) => alert(prettyJson(e)))
        .finally(() => replaceLocationWithTopPage());
    }

    // Shared Target API
    if (urlParams.title && urlParams.text) {
      createCommit({ text: JSON.stringify({ ...urlParams, tags: ['SharedTargetAPI'] }) })
        .then(() => {
          window.history.pushState({}, document.title, new URL(window.location.href).pathname); // drop search params
        })
        .catch(console.error);
    }
  }, [urlParams]);

  return {
    startUrl,
    urlParams,
    appOpenedBy,
    accessToken,
    hasAccessToken,
    onceInitializeApp,
  } as const;
};

type AppUrlQueryParams = Record<'code' | 'title' | 'text', string | undefined>;
const getUrlQueryParams = (search = window.location.search) => {
  return Object.fromEntries(new URLSearchParams(search).entries()) as AppUrlQueryParams;
};
