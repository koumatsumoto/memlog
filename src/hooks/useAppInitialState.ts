import { useMemo } from 'react';
import { selector, useRecoilValue } from 'recoil';
import { match, P } from 'ts-pattern';
import { getUrlQueryParams } from '../utils';
import { storage } from './storage';

const startUrlState = selector({
  key: 'startUrlState',
  get: () => window.location.href,
});

const startUrlParamsState = selector({
  key: 'startUrlParamsState',
  get: () => getUrlQueryParams<'code' | 'title' | 'text'>(),
});

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
  const accessToken = useMemo(() => storage.loadAccessToken(), []);
  const hasAccessToken = Boolean(accessToken);

  return {
    startUrl,
    urlParams,
    appOpenedBy,
    accessToken,
    hasAccessToken,
  } as const;
};
