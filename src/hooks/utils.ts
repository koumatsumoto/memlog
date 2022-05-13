import { useCallback, useState } from 'react';

export const useLoadingState = <Data, Params>(fn: (params: Params) => Promise<Data>) => {
  const [state, setState] = useState<{ loading: boolean; data: undefined; error: undefined } | { loading: false; data: Data; error: undefined } | { loading: false; data: undefined; error: Error }>({ loading: false, data: undefined, error: undefined });

  return [
    useCallback(
      (params: Params) => {
        setState({ loading: true, data: undefined, error: undefined });
        fn(params)
          .then((data) => setState({ loading: false, data, error: undefined }))
          .catch((error) => setState({ loading: false, data: undefined, error: error instanceof Error ? error : new Error(error) }));
      },
      [setState],
    ),
    state,
  ] as const;
};

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
