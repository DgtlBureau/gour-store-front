import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import sx from './ReviewsCounter.styles';

const gradeTexts: Record<number, string> = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично',
};

type ReviewsCounterProps = { grade: number; count: number; percent: number };

export function ReviewsCounter({ grade, percent, count }: ReviewsCounterProps) {
  const gradeCountText = gradeTexts[grade] || 'Нормально';

  return (
    <Box sx={sx.counter}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' sx={{ marginRight: '10px' }}>
            {gradeCountText}
          </Typography>
        </Box>

        <Typography variant='body2' sx={sx.reviews}>
          {count}
        </Typography>
      </Box>

      <Box sx={sx.progress}>
        <div style={{ ...sx.progressFill, width: `${percent}%` }} />
      </Box>
    </Box>
  );
}
