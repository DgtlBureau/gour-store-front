/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from 'react';

import { intervalToDuration } from 'date-fns';

const zeroPad = (num: number) => String(num).padStart(2, '0');

export const useTimer = (expiresTime: Date, onEnd: () => void) => {
  const [timerTime, setTimerTime] = useState<string | null>(null);

  const requestRef = useRef<number>();

  const animate = () => {
    const nowTime = new Date();
    const isEnd = nowTime.getTime() > expiresTime.getTime();
    if (isEnd) {
      cancelAnimationFrame(requestRef.current!);
      onEnd();
      return;
    }

    const { minutes, seconds } = intervalToDuration({
      start: nowTime,
      end: expiresTime,
    });

    const formattedTime = `${zeroPad(minutes!)}:${zeroPad(seconds!)}`; // TODO: добавить возможность передавать массив с форматом времени аргументом

    if (formattedTime !== timerTime) {
      setTimerTime(formattedTime);
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  return { timerTime };
};
