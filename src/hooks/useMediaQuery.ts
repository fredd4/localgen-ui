import * as React from "react";

/**
 * Hook that utilizes `useSyncExternalStore` to subscribe to media query changes.
 *
 * @param query - The media query string to listen for.
 * @returns A boolean indicating whether the media query currently matches.
 */
export function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (callback: (event: MediaQueryListEvent) => void) => {
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
