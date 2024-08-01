import React, { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  // const [value, setValue] = useState(false);
  // useEffect(() => {
  //   function onChange(event: MediaQueryListEvent) {
  //     setValue(event.matches);
  //   }

  //   const result = matchMedia(query);
  //   result.addEventListener("change", onChange);
  //   setValue(result.matches);
  //   return () => result.removeEventListener("change", onChange);
  // }, [query]);

  // return value;

  const subscribe = React.useCallback(
    (callback: any) => {
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

  const getServerSnapshot = () => {
    throw Error("useMediaQuery is a client-only hook");
  };

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
