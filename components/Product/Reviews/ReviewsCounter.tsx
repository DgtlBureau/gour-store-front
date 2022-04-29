import React from 'react';
import { Stack } from '@mui/material';

import { Box } from '../../UI/Box/Box';
import { getDeclensionWordByCount } from '../../../utils/wordHelper';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import translations from './Reviews.i18n.json';

import StarIcon from '@mui/icons-material/Star';

const sx = {
  progress: {
    width: '130px',
    height: '2px',
    backgroundColor: '#fff',
  },
  progressFill: {
    backgroundColor: 'rgba(0, 115, 213, 1)',
    height: '100%',
  },
};

type Props = { grade: number; count: number; percent: number };

export const ReviewsCounter = ({ grade, percent, count }: Props) => {
  const { t } = useLocalTranslation(translations);

  const reviewsCountText = getDeclensionWordByCount(count, [
    t('manyReviews'),
    t('oneReview'),
    t('someReviews'),
  ]);

  return (
    <Stack direction="row" alignItems="center">
      {grade}
      <StarIcon />
      <Box sx={sx.progress}>
        <div style={{ ...sx.progressFill, width: `${percent}%` }} />
      </Box>
      {count}
      {' '}
      {reviewsCountText}
    </Stack>
  );
};
