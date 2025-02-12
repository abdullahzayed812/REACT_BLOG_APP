import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{ width: number | undefined; height: number | undefined }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    const cleanUp = () => window.removeEventListener("resize", handleResize);

    return cleanUp;
  }, []);

  return windowSize;
};
