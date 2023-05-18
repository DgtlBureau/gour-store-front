import React, { forwardRef, useMemo } from 'react';

import { Grid, SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { formatDate } from 'utils/dateUtil';

import { CardSlider } from '../../CardSlider/CardSlider';
import { CommentCard } from '../../Comment/Card/Card';
import translations from './Reviews.i18n.json';

import reviewSx from './ReviewsForMain.styles';

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

export const ProductReviewsForMain = forwardRef<HTMLDivElement, ProductReviewsProps>(({ reviews, sx, onReviewClick }, ref) => {
  const { t } = useLocalTranslation(translations);

  const reviewCardList = useMemo(
    () =>
      reviews.map(review => (
        <CommentCard
          commentSx={{width: '250px'}}
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
    <Box sx={{ ...reviewSx.container, ...sx }}>
      <Typography variant='h5' color='primary' sx={reviewSx.title}>
        Отзывы
      </Typography>

      <Grid item xs={12} md={9}>
        {reviews.length === 0 ? (
          <Typography variant='h5'>{t('noReviews')}</Typography>
        ) : (
          <CardSlider sx={reviewSx.slider} slidesPerRow={4} cardList={reviewCardList} />
        )}
      </Grid>
    </Box>
  );
});
