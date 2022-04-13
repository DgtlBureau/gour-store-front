import React, { CSSProperties, useCallback, useEffect, useState } from 'react';

import { Typography } from '../UI/Typography/Typography';
import { differenceInSeconds, minutesToHours } from 'date-fns';
import { Stack } from '@mui/material';

import s from './PromotionHeader.module.scss';
import { secondsToMinutes } from 'date-fns/esm';

import translations from './PromotionHeader.i18n.json';
import { useLocalTranslation } from './../../hooks/useLocalTranslation';

export type PromotionHeaderProps = {
  title: string;
  image: string;
  end: Date;
};

const headerSx: CSSProperties = {
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '6px',
  backgroundColor: '#ebebeb',
};

export function PromotionHeader({ title, image, end }: PromotionHeaderProps) {
  const { t } = useLocalTranslation(translations);

  const [seconds, setSeconds] = useState<number>(10);
  const [timer, setTimer] = useState<string>('');

  let intervalId = -1;
  useEffect(() => {
    const nowDate = new Date();
    setSeconds(differenceInSeconds(end, nowDate));

    intervalId = +setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    setTimer(formatSeconds(seconds));
    if (seconds < 0) return clearInterval(intervalId);
  }, [seconds]);

  const formatSeconds = (seconds: number) => {
    const remainderSeconds = seconds % 60;
    const roundedSeconds = seconds - remainderSeconds;
    const minutes = secondsToMinutes(roundedSeconds);
    const hours = minutesToHours(minutes);
    const reminderMinutes = minutes % 60;
    const formattedMinutes =
      reminderMinutes < 10 ? `0${reminderMinutes}` : reminderMinutes;
    const formattedSeconds =
      remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds;

    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <Stack sx={{ maxWidth: '1200px' }}>
      <Stack sx={{ ...headerSx }}>
        <img className={s.image} src={image} />
        <Typography
          sx={{ position: 'absolute', top: '30px', left: '30px' }}
          variant="h2"
        >
          {title}
        </Typography>
        <div className={s.timer}>
          <Typography variant="body1">
            {seconds > 0 ? `${t('left')} ${timer}` : t('end')}
          </Typography>
        </div>
      </Stack>
    </Stack>
  );
}
