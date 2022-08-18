import React from 'react';
import { Paper, Rating } from '@mui/material';

import StarIcon from '@mui/icons-material/Star';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { defaultTheme as t } from 'themes';

const sx = {
  comment: {
    width: {
      xs: '250px',
      sm: '280px',
    },
    padding: '12px',
    backgroundColor: t.palette.common.white,
    boxShadow: 'none',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    margin: '6px 0',
  },
  date: {
    marginLeft: '16px',
  },
  text: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
};

export type CommentCardProps = {
  title: string;
  grade: number;
  date: string;
  text: string;
};

export function CommentCard({ title, grade, date, text }: CommentCardProps) {
  return (
    <Paper sx={sx.comment} elevation={0}>
      <Typography variant='body1' color='primary'>
        {title}
      </Typography>

      <Box sx={sx.rating}>
        <Rating
          value={grade}
          precision={0.5}
          readOnly
          icon={<StarIcon fontSize='small' htmlColor={t.palette.accent.main} />}
          emptyIcon={<StarIcon fontSize='small' htmlColor={t.palette.text.muted} />}
        />
        <Typography sx={sx.date} variant='body2' color='text.muted'>
          {date}
        </Typography>
      </Box>

      <Typography sx={sx.text} variant='body2' color='text.muted'>
        {text}
      </Typography>
    </Paper>
  );
}
