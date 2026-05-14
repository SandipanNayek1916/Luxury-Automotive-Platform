"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

interface CinematicBridgeContextValue {
  /** True once the loader has started its exit sequence */
  loaderExiting: boolean;
  /** True if the loader should be rendered at all */
  isVisible: boolean;
  /** Called by CinematicLoader to hide itself */
  setIsVisible: (visible: boolean) => void;
  /** Called by CinematicLoader the instant it begins to exit */
  signalLoaderExiting: () => void;
}

const CinematicBridgeContext = createContext<CinematicBridgeContextValue>({
  loaderExiting: false,
  isVisible: true,
  setIsVisible: () => {},
  signalLoaderExiting: () => {},
});

export function CinematicBridgeProvider({ children }: { children: ReactNode }) {
  const [loaderExiting, setLoaderExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Initialize visibility from localStorage on mount
  useEffect(() => {
    // Temporarily disabled to allow viewing the loader every time
    // if (typeof window !== "undefined" && localStorage.getItem("unique_loader_seen")) {
    //   setIsVisible(false);
    //   setLoaderExiting(true);
    // }
  }, []);

  const signalLoaderExiting = useCallback(() => {
    setLoaderExiting(true);
    // Persist seen state
    if (typeof window !== "undefined") {
      localStorage.setItem("unique_loader_seen", "true");
    }
  }, []);

  return (
    <CinematicBridgeContext.Provider value={{ 
      loaderExiting, 
      isVisible, 
      setIsVisible,
      signalLoaderExiting 
    }}>
      {children}
    </CinematicBridgeContext.Provider>
  );
}

export function useCinematicBridge() {
  return useContext(CinematicBridgeContext);
}
