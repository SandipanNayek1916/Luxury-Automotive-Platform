"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface CinematicBridgeContextValue {
  /** True once the loader has started its exit sequence */
  loaderExiting: boolean;
  /** Called by CinematicLoader the instant it begins to exit */
  signalLoaderExiting: () => void;
}

const CinematicBridgeContext = createContext<CinematicBridgeContextValue>({
  loaderExiting: false,
  signalLoaderExiting: () => {},
});

export function CinematicBridgeProvider({ children }: { children: ReactNode }) {
  const [loaderExiting, setLoaderExiting] = useState(false);

  const signalLoaderExiting = useCallback(() => {
    setLoaderExiting(true);
  }, []);

  return (
    <CinematicBridgeContext.Provider value={{ loaderExiting, signalLoaderExiting }}>
      {children}
    </CinematicBridgeContext.Provider>
  );
}

export function useCinematicBridge() {
  return useContext(CinematicBridgeContext);
}
