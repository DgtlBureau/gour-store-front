import { useEffect, useRef, useState } from 'react';

export const useStopwatch = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState<number | null>(null);

  const intervalRef = useRef<number | null>(null);

  const tickStopwatch = () => setSeconds(sec => sec && sec - 1);

  const startCount = () => setSeconds(initialSeconds);

  const stopCount = () => {
    if (intervalRef.current) {
      setSeconds(null);
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => stopCount, []);

  useEffect(() => {
    if (seconds && !intervalRef.current) {
      intervalRef.current = window.setInterval(tickStopwatch, 1000);
    }
    if (seconds === 0) stopCount();
  }, [seconds]);

  return { seconds, startCount, stopCount };
};
