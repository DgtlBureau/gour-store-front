import { Stack } from '@mui/material';
import React from 'react';

import s from './Reviews.module.scss';
import StarIcon from '@mui/icons-material/Star';

type Props = { grade: number; count: number; percent: number };

export const ReviewsCounter = ({ grade, percent, count }: Props) => {
  return (
    <Stack direction="row" alignItems="center">
      {grade}
      <StarIcon />
      <div className={s.progress}>
        <div className={s.progressFill} style={{ width: `${percent}%` }}></div>
      </div>
      {count} отзывов
    </Stack>
  );
};
