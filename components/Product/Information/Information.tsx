/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { Rating } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getDeclensionWordByCount } from 'utils/wordHelper';

import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import StarIcon from '@mui/icons-material/Star';

import translations from './Information.i18n.json';
import sx from './Information.styles';

export type ProductInformationProps = {
  rating: number;
  gradesCount: number;
  commentsCount: number;
  categories: {
    label: string;
    value: string | number;
  }[];
  onClickComments(): void;
};

export function ProductInformation({
  rating,
  gradesCount,
  commentsCount,
  categories,
  onClickComments,
}: ProductInformationProps) {
  const { t } = useLocalTranslation(translations);

  const gradesCountText = getDeclensionWordByCount(gradesCount, [t('manyGrades'), t('oneGrade'), t('someGrades')]);
  const commentsCountText = getDeclensionWordByCount(commentsCount, [
    t('manyReviews'),
    t('oneReview'),
    t('someReviews'),
  ]);

  return (
    <Box sx={sx.info}>
      <Box sx={sx.stats}>
        <Box sx={sx.stat}>
          <Rating
            value={rating}
            precision={0.5}
            size='small'
            readOnly
            icon={<StarIcon fontSize='small' sx={sx.star} />}
            emptyIcon={<StarIcon fontSize='small' sx={sx.emptyStar} />}
          />

          <Typography variant='body2' sx={sx.count}>
            {gradesCount} {gradesCountText}
          </Typography>
        </Box>

        <div role='button' style={{ ...sx.stat, ...sx.comments }} onClick={onClickComments} tabIndex={0}>
          <ChatBubbleIcon fontSize='small' />

          <Typography variant='body2' sx={sx.count}>
            {commentsCount} {commentsCountText}
          </Typography>
        </div>
      </Box>
      {categories.map(category => (
        <Box key={category.label} sx={sx.category}>
          <Typography variant='body2'>{category.label}</Typography>

          <div style={sx.divider} />

          <Typography variant='body2' sx={sx.value}>
            {category.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
