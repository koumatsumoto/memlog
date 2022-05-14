import { useEffect } from 'react';
import { atom, useRecoilValue } from 'recoil';
import { match, P } from 'ts-pattern';
import { getUrlQueryParams, notask } from '../../utils';
import { replaceLocationWithTopPage, requestAccessTokenAndSaveToStorage } from '../login';
import { storage } from '../storage';

const state = {
  urlQueryParams: atom({ key: 'urlQueryParams', default: getUrlQueryParams() }),
  githubAccessToken: atom({ key: 'githubAccessToken', default: storage.loadAccessToken() }),
} as const;

export const useApplicationSetup = () => {
  /**
   * URLパラメータからアプリの起動種別を判定する
   *   1. `code` のパラメータがある場合はOAuth認証後のリダイレクト
   *   2. `title`, `text` のパラメータがある場合はShareTargetApiによる呼び出し
   *   3. パラメータがない場合は、通常起動
   */
  const params = useRecoilValue(state.urlQueryParams) as { code?: string; title?: string; text?: string };
  const appOpenedBy = match(params)
    .with({ code: P.string }, () => 'StartedWithOAuthRedirect' as const)
    .with({ title: P.string, text: P.string }, () => 'StartedWithSharedTargetAPI' as const)
    .otherwise(() => 'StartedWithUser' as const);

  /**
   * 以前にOAuth認証が完了してアクセスキーを発行している場合はStorageにキャッシュを保存しているため、それを確認する
   *   - TODO: validation
   */
  const hasAccessToken = Boolean(useRecoilValue(state.githubAccessToken));

  useEffect(() => {
    match(appOpenedBy)
      .with('StartedWithOAuthRedirect', async () => {
        await requestAccessTokenAndSaveToStorage(params.code!);
        replaceLocationWithTopPage();
      })
      .with('StartedWithSharedTargetAPI', async () => {
        alert(`Page opened by Web Share API, title=${params.title}, text=${params.text}`);
        replaceLocationWithTopPage();
      })
      .otherwise(notask)
      .then(() => {
        console.log('[app] setup completed');
      })
      .catch((e) => {
        console.error(e);
        alert(`Failed to application setup, ${e?.message ?? String(e)}`);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    params,
    appOpenedBy,
    hasAccessToken,
  } as const;
};