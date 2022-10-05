import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getDeclensionWordByCount } from 'utils/wordUtil';

import StarIcon from '@mui/icons-material/Star';
import { defaultTheme as theme } from 'themes';

import translations from './Reviews.i18n.json';

const sx = {
  counter: {
    display: 'flex',
    alignItems: 'center',
    color: 'text.muted',
    marginBottom: '10px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  progress: {
    width: '100%',
    height: '2px',
    backgroundColor: 'common.white',
  },
  progressFill: {
    backgroundColor: theme.palette.accent.main,
    height: '100%',
  },
  star: {
    margin: '0 10px',
    color: theme.palette.accent.main,
  },
  reviews: {
    display: 'flex',
    whiteSpace: 'nowrap',
    marginLeft: '10px',
  },
};

type Props = { grade: number; count: number; percent: number };

export function ReviewsCounter({ grade, percent, count }: Props) {
  const { t } = useLocalTranslation(translations);

  const reviewsCountText = getDeclensionWordByCount(count, [t('manyReviews'), t('oneReview'), t('someReviews')]);

  return (
    <Box sx={sx.counter}>
      <Typography variant='body2'>{grade}</Typography>

      <StarIcon fontSize='small' sx={sx.star} />

      <Box sx={sx.progress}>
        <div style={{ ...sx.progressFill, width: `${percent}%` }} />
      </Box>

      <Typography variant='body2' sx={sx.reviews}>
        {count} {reviewsCountText}
      </Typography>
    </Box>
  );
}
