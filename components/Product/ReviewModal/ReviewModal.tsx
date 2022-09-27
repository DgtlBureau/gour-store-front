import React from 'react';
import { Rating } from '@mui/material';

import StarIcon from '@mui/icons-material/Star';

import { Modal } from 'components/UI/Modal/Modal';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { Review } from '../Reviews/Reviews';
import { formatDate } from 'helpers/dateHelper';
import { defaultTheme as t } from '../../../themes';

import sx from './ReviewModal.styles';

export type ReviewModalProps = {
  isOpen: boolean;
  review: Review;
  onClose: () => void;
};

export function ReviewModal({ isOpen, review, onClose }: ReviewModalProps) {
  return (
    <Modal isOpen={isOpen} title={`Отзыв от пользователя ${review.clientName}`} onClose={onClose}>
      <Box sx={sx.rating}>
        <Rating
          value={review.value}
          precision={0.5}
          readOnly
          icon={<StarIcon fontSize='small' htmlColor={t.palette.accent.main} />}
          emptyIcon={<StarIcon fontSize='small' htmlColor={t.palette.text.muted} />}
        />

        <Typography sx={sx.date} variant='body2' color='text.muted'>
          {formatDate(review.date)}
        </Typography>
      </Box>

      <Typography variant='body2' color='text.muted'>
        {review.comment}
      </Typography>
    </Modal>
  );
}
