import { GQL, query } from './gql';
import { getAuthHeader } from './hooks';

export const toSuspenseLoader = <A>(promise: Promise<A>) => {
  let status: 'pending' | 'fulfilled' | 'rejected' = 'pending';
  let result: A | Error | undefined;

  const suspender = promise.then(
    (data) => {
      status = 'fulfilled';
      result = data;
    },
    (error) => {
      status = 'rejected';
      result = error instanceof Error ? error : new Error(error);
    },
  );

  return {
    load: () => {
      switch (status) {
        case 'pending':
          throw suspender;
        case 'fulfilled':
          return result as A;
        case 'rejected':
          throw result;
      }
    },
  } as const;
};

export const userinfoLoader = toSuspenseLoader(query(GQL.USER_INFORMATION, { repositoryName: 'memlog-storage', headers: getAuthHeader() }));
