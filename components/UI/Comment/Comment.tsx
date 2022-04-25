import React from 'react';
import { Paper, Rating } from '@mui/material';

import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';
import { defaultTheme as t } from '../../../themes';

import StarIcon from '@mui/icons-material/Star';

const sx = {
  comment: {
    width: '280px',
    padding: '12px',
    backgroundColor: 'background.default',
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

export type CommentProps = {
  title: string;
  grade: number;
  date: string;
  text: string;
};

export function Comment({
  title,
  grade,
  date,
  text,
}: CommentProps) {
  return (
    <Paper sx={sx.comment} elevation={0}>
      <Typography variant="body1" color="primary">{title}</Typography>

      <Box sx={sx.rating}>
        <Rating
          value={grade}
          precision={0.5}
          readOnly
          icon={<StarIcon fontSize="small" htmlColor={t.palette.accent.main} />}
          emptyIcon={<StarIcon fontSize="small" htmlColor={t.palette.text.muted} />}
        />
        <Typography sx={sx.date} variant="body2" color="text.muted">{date}</Typography>
      </Box>

      <Typography sx={sx.text} variant="body2" color="text.muted">{text}</Typography>
    </Paper>
  );
}
