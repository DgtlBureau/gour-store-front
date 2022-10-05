import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { Stack, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles/createTheme';

import { Typography } from 'components/UI/Typography/Typography';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { formatSeconds } from 'utils/timeUtil';

import { differenceInSeconds } from 'date-fns';

import translations from './Header.i18n.json';
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
      setSeconds(sec => sec - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    const time = formatSeconds(seconds);
    setTimer(time);
    if (seconds < 0) clearInterval(intervalId);
  }, [seconds]);

  const placeholder =
    'https://i.pinimg.com/736x/ca/f2/48/caf24896f739c464073ee31edfebead2--images-for-website-website-designs.jpg';

  return (
    <Stack sx={{ ...headerSx.promotion, ...sx } as SxProps<Theme>}>
      <Image
        loader={() => image || placeholder}
        src={image || placeholder}
        objectFit='cover'
        layout='responsive'
        height={400}
        width={500}
        alt=''
      />

      <Typography variant='body1' sx={headerSx.timer}>
        {seconds > 0 ? `${t('left')} ${timer}` : t('end')}
      </Typography>
    </Stack>
  );
}
