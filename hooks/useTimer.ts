/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from 'react';

import { intervalToDuration } from 'date-fns';

const zeroPad = (num: number) => String(num).padStart(2, '0');

type TimerOptions = {
  onEnd: () => void;
  needCount?: boolean;
};

export const useTimer = (expiresTime: Date, { onEnd, needCount = true }: TimerOptions) => {
  const [timerTime, setTimerTime] = useState<string | null>(null);

  const requestRef = useRef<number>();

  const isEndTime = () => {
    const nowTime = new Date();
    return nowTime.getTime() > expiresTime.getTime();
  };

  const animate = () => {
    const isEnd = isEndTime();
    if (isEnd) {
      cancelAnimationFrame(requestRef.current!);
      onEnd();
      return;
    }

    const { minutes, seconds, hours } = intervalToDuration({
      start: new Date(),
      end: expiresTime,
    });

    const formattedTime = [hours, minutes, seconds]
      .filter(i => !!i)
      .map(time => zeroPad(time!))
      .join(':');

    if (formattedTime !== timerTime) {
      setTimerTime(formattedTime);
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const isTimerStarted = !!requestRef.current;
    if (!needCount && !isTimerStarted) {
      return undefined;
    }

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  return { timerTime };
};
