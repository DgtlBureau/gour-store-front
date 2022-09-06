import React, { forwardRef } from 'react';
import { Grid, SxProps } from '@mui/material';

import translations from './Reviews.i18n.json';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { Box } from 'components/UI/Box/Box';
import { CardSlider } from '../../CardSlider/CardSlider';
import { CommentCard } from '../../Comment/Card/Card';
import { Typography } from 'components/UI/Typography/Typography';
import { ReviewsCounter } from './ReviewsCounter';
import { formatDate } from 'helpers/dateHelper';
import { defaultTheme as theme } from 'themes';

type Review = {
  id: number;
  clientName: string;
  value: number;
  comment: string;
  date: Date;
};

export type ProductReviewsProps = {
  reviews: Review[];
  sx: SxProps;
};

const sxReviews = {
  container: {
    background: theme.palette.background.paper,
    borderRadius: '6px',
    padding: '20px',
  },
  title: {
    marginBottom: '20px',
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: 'text.primary',
  },
  slider: {
    height: '100%',
    justifyContent: 'space-between',
  },
  stats: {
    margin: {
      xs: 0,
      md: '0 20px 0 0',
    },
  },
};

export const ProductReviews = forwardRef<HTMLDivElement, ProductReviewsProps>(({ reviews, sx }, ref) => {
  const { t } = useLocalTranslation(translations);

  const ratingStats = [];

  for (let i = 5; i >= 1; i--) {
    const reviewsCount = reviews.filter(review => review.value === i).length;
    ratingStats.push({
      grade: i,
      count: reviewsCount,
      percent: reviewsCount ? (reviewsCount / reviews.length) * 100 : 0,
    });
  }

  return (
    <Grid sx={{ ...sxReviews.container, ...sx }} container direction='row' ref={ref}>
      <Grid item xs={12} md={3}>
        <Box sx={sxReviews.stats}>
          <Typography variant='h5' color='primary' sx={sxReviews.title}>
            {t('reviews')}
          </Typography>
          {ratingStats.map(stat => (
            <ReviewsCounter
              key={`${stat.grade}/${stat.count}/${stat.percent}`}
              grade={stat.grade}
              count={stat.count}
              percent={stat.percent}
            />
          ))}
        </Box>
      </Grid>

      <Grid item xs={12} md={9}>
        {reviews.length === 0 ? (
          <Typography variant='h5'>{t('noReviews')}</Typography>
        ) : (
          <CardSlider
            sx={sxReviews.slider}
            slidesPerView={3}
            cardsList={reviews.map(review => (
              <CommentCard
                key={review.id}
                title={review.clientName}
                grade={review.value}
                date={formatDate(review.date)}
                text={review.comment}
              />
            ))}
          />
        )}
      </Grid>
    </Grid>
  );
});
