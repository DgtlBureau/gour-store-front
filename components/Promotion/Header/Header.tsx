import React, { useEffect, useState } from 'react';
import { Theme } from '@mui/material/styles/createTheme';
import { differenceInSeconds } from 'date-fns';
import { Stack, SxProps } from '@mui/material';
import Image from 'next/image';

import translations from './Header.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Typography } from '../../UI/Typography/Typography';
import { formatSeconds } from '../../../helpers/timeHelper';
import { headerSx } from './Header.styles';

export type PromotionHeaderProps = {
  image: string;
  end: Date;
  sx?: SxProps;
};

export function PromotionHeader({ image, end, sx }: PromotionHeaderProps) {
  const { t } = useLocalTranslation(translations);

  const [seconds, setSeconds] = useState(10);
  const [timer, setTimer] = useState('');

  let intervalId = -1;

  useEffect(() => {
    const nowDate = new Date();
    setSeconds(differenceInSeconds(end, nowDate));

    intervalId = +setInterval(() => {
      setSeconds((sec) => sec - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    const time = formatSeconds(seconds);
    setTimer(time);
    if (seconds < 0) clearInterval(intervalId);
  }, [seconds]);

  return (
    <Stack sx={{ ...headerSx.promotion, ...sx } as SxProps<Theme>}>
      <Image src={image} objectFit='cover' layout='responsive' height={400} width={500} alt='' />

      <Typography variant='body1' sx={headerSx.timer}>
        {seconds > 0 ? `${t('left')} ${timer}` : t('end')}
      </Typography>
    </Stack>
  );
}
