import React, { useEffect, useState } from 'react';

import { differenceInSeconds, minutesToHours, secondsToMinutes } from 'date-fns';
import { Stack, SxProps } from '@mui/material';
import Image from 'next/image';

import translations from './PromotionHeader.i18n.json';
import { useLocalTranslation } from './../../hooks/useLocalTranslation';
import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import {Theme} from "@mui/material/styles/createTheme";

const headerSx = {
  promotion: {
    maxHeight: '360px',
    maxWidth: '1200px',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '6px',
    backgroundColor: '#ebebeb',
  },
  timer: {
    padding: '10px',
    position: 'absolute',
    right: '30px',
    bottom: '30px',
    borderRadius: '6px',
    backgroundColor: 'background.default',
  },
  title: {
    position: 'absolute', 
    top: '30px', 
    left: '30px',
    padding: '10px',
    borderRadius: '6px',
    backgroundColor: 'background.default',
  },
}

export type PromotionHeaderProps = {
  title: string;
  image: string;
  end: Date;
  sx?: SxProps; 
};

export function PromotionHeader({ title, image, end, sx }: PromotionHeaderProps) {
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
    <Stack sx={{ ...headerSx.promotion, ...sx } as SxProps<Theme>}>
      <Image src={image} objectFit="cover" layout="responsive" height={400} width={500} alt="" />

      <Typography sx={headerSx.title} variant="body1">
        {title}
      </Typography>

      <Box sx={headerSx.timer}>
        <Typography variant="body1">
          {seconds > 0 ? `${t('left')} ${timer}` : t('end')}
        </Typography>
      </Box>
    </Stack>
  );
}
