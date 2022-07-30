import { useCallback, useState } from 'react';

export const useLoadingState = <Data, Params>(fn: (params: Params) => Promise<Data>) => {
  const [state, setState] = useState<
    | { loading: boolean; data: undefined; error: undefined }
    | { loading: false; data: Data; error: undefined }
    | { loading: false; data: undefined; error: Error }
  >({
    loading: false,
    data: undefined,
    error: undefined,
  });

  return [
    useCallback(
      (params: Params) => {
        setState({ loading: true, data: undefined, error: undefined });
        fn(params)
          .then((data) => setState({ loading: false, data, error: undefined }))
          .catch((error) => setState({ loading: false, data: undefined, error: error instanceof Error ? error : new Error(error) }));
      },
      [setState, fn],
    ),
    state,
  ] as const;
};
