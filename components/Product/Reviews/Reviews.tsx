import React, { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Stack } from '@mui/material';

import { Comment } from '../..//UI/Comment/Comment';
import { Typography } from '../../UI/Typography/Typography';
import { ReviewsCounter } from './ReviewsCounter';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import translations from './Reviews.i18n.json';
import { formatDate } from 'helpers/dateHelper';

type Review = {
  id: number;
  clientName: string;
  value: number;
  comment: string;
  date: Date;
};

export type ProductReviewsProps = {
  reviews: Review[];
  sx: CSSProperties;
};

const containerBoxSx: CSSProperties = {
  background: '#EBEBEB',
  borderRadius: '6px',
  padding: '20px',
};

export const ProductReviews = ({ reviews, sx }: ProductReviewsProps) => {
  const { t } = useLocalTranslation(translations);

  let ratingStats = [];

  for (let i = 5; i >= 1; i--) {
    const reviewsCount = reviews.filter(review => review.value === i).length;
    ratingStats.push({
      grade: i,
      count: reviewsCount,
      percent: reviewsCount ? (reviewsCount / reviews.length) * 100 : 0,
    });
  }

  return (
    <Grid sx={sx} container spacing={1} direction="row" style={containerBoxSx}>
      <Grid item xs={3}>
        <Stack>
          <Typography variant="h5">{t('reviews')}</Typography>
          {ratingStats.map(stat => (
            <ReviewsCounter
              key={`${stat.grade}/${stat.count}/${stat.percent}`}
              grade={stat.grade}
              count={stat.count}
              percent={stat.percent}
            />
          ))}
        </Stack>
      </Grid>
      <Grid item xs={9}>
        <Swiper slidesPerView={3} spaceBetween={10}>
          {reviews.length === 0 && (
            <Typography variant="h5">{t('noReviews')}</Typography>
          )}
          {reviews.map(review => (
            <SwiperSlide key={review.id}>
              <Comment
                title={review.clientName}
                grade={review.value}
                date={formatDate(review.date)}
                text={review.comment}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
};
