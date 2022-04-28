import React from 'react';
import { Stack } from '@mui/material';

import { getDeclensionWordByCount } from '../../../utils/wordHelper';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import translations from './Reviews.i18n.json';

import s from './Reviews.module.scss';

import StarIcon from '@mui/icons-material/Star';

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
      <div className={s.progress}>
        <div className={s.progressFill} style={{ width: `${percent}%` }}></div>
      </div>
      {count} {reviewsCountText}
    </Stack>
  );
};
