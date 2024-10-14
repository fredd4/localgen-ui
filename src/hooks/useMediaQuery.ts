import * as React from "react";

export function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (callback: { (this: MediaQueryList, ev: MediaQueryListEvent): any; (this: MediaQueryList, ev: MediaQueryListEvent): any; }) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [query]
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  return React.useSyncExternalStore(subscribe, getSnapshot);
}
