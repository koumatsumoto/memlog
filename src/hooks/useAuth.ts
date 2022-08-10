import { useMemo } from "react";
import { ENV } from "../environments";
import { AppStorage } from "./AppStorage";

export const login = () => {
  window.location.href = `https://github.com/login/oauth/authorize?${new URLSearchParams({
    client_id: ENV.oauthClientId,
    redirect_uri: ENV.oauthRedirectUrl,
    scope: "read:user repo",
  })}`;
};

export const logout = async () => {
  const token = AppStorage.loadAccessToken();
  AppStorage.resetAll();

  if (token) {
    await fetch("https://memlog-auth.deno.dev/logout", { method: "POST", body: JSON.stringify({ token, isDev: ENV.isLocalhost }) }).then(
      (res) => res.json(),
    );
  }

  replaceLocationWithTopPage();
};

export const replaceLocationWithTopPage = () => {
  window.location.replace(ENV.routes.top);
};

type LoginApiResponse =
  | {
      data: {
        access_token: string;
        scope: string;
        token_type: "bearer";
      };
      error: never;
    }
  | {
      data: never;
      error: string | "bad_verification_code";
    };

export const requestAccessToken = async (code: string) => {
  const { data, error } = await fetch("https://memlog-auth.deno.dev/login", {
    method: "POST",
    body: JSON.stringify({ code, isDev: ENV.isLocalhost }),
  }).then((res) => res.json() as Promise<LoginApiResponse>);
  if (error) {
    throw error;
  }

  return data.access_token;
};

export const useAuth = () => {
  const accessToken = useMemo(() => AppStorage.loadAccessToken(), []);

  return {
    canLogout: Boolean(accessToken),
  } as const;
};
