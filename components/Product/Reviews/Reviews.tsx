import React, { forwardRef, useMemo } from 'react';

import { Grid, Rating, SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { formatDate } from 'utils/dateUtil';

import { color } from 'themes';

import { CardSlider } from '../../CardSlider/CardSlider';
import { CommentCard } from '../../Comment/Card/Card';
import translations from './Reviews.i18n.json';
import { ReviewsCounter } from './ReviewsCounter';

import reviewSx from './Reviews.styles';

import StarIcon from '@mui/icons-material/Star';

export type Review = {
  id: number;
  clientName: string;
  value: number;
  comment: string;
  date: Date;
  productId: number;
};

export type ProductReviewsProps = {
  reviews: Review[];
  sx: SxProps;
  onReviewClick: (review: Review) => void;
};

export const ProductReviews = forwardRef<HTMLDivElement, ProductReviewsProps>(({ reviews, sx, onReviewClick }, ref) => {
  const { t } = useLocalTranslation(translations);

  const grade = reviews.reduce((acc, it) => acc + it.value, 0) / reviews.length;

  const ratingStats = [];

  for (let i = 5; i >= 1; i--) {
    const reviewsCount = reviews.filter(review => review.value === i).length;

    ratingStats.push({
      grade: i,
      count: reviewsCount,
      percent: reviewsCount ? (reviewsCount / reviews.length) * 100 : 0,
    });
  }

  const reviewCardList = useMemo(
    () =>
      reviews.map(review => (
        <CommentCard
          key={review.id}
          title={review.clientName}
          grade={review.value}
          date={formatDate(review.date)}
          text={review.comment}
          onClick={() => onReviewClick(review)}
        />
      )),
    [reviews],
  );

  return (
    <Grid sx={{ ...reviewSx.container, ...sx }} container direction='row' ref={ref}>
      <Grid item xs={12} md={3}>
        <Box sx={reviewSx.stats}>
          <Typography variant='h5' color='primary' sx={reviewSx.title}>
            {t('reviews')}
          </Typography>

          <Box sx={reviewSx.rating}>
            <Rating
              name='grade'
              value={grade}
              precision={0.1}
              size='large'
              readOnly
              icon={<StarIcon sx={reviewSx.star} />}
              emptyIcon={<StarIcon sx={reviewSx.emptyStar} />}
            />

            <Typography variant='body1' color={color.muted}>
              {grade.toFixed(2)} / 5
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ratingStats.map(stat => (
              <ReviewsCounter
                key={`${stat.grade}/${stat.count}/${stat.percent}`}
                grade={stat.grade}
                count={stat.count}
                percent={stat.percent}
              />
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={9}>
        {reviews.length === 0 ? (
          <Typography variant='h5'>{t('noReviews')}</Typography>
        ) : (
          <CardSlider sx={reviewSx.slider} slidesPerRow={3} cardList={reviewCardList} />
        )}
      </Grid>
    </Grid>
  );
});
