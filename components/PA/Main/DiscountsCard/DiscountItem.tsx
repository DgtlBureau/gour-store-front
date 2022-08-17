import { Grid, Stack } from '@mui/material';
import React from 'react';
import { Box } from '../../../UI/Box/Box';
import { defaultTheme as theme } from '../../../../themes';
import { Typography } from '../../../UI/Typography/Typography';

type Props = {
  discount: {
    id: string;
    title: string;
    category: string;
    percent: number;
  };
};

const sx = {
  title: {
    color: theme.palette.text.primary,
  },
  percent: {
    textAlign: 'center',
    color: theme.palette.accent.main,
  },
  progress: {
    width: '100%',
    height: '2px',
    backgroundColor: 'rgb(244, 231, 206)',
  },
  progressFill: {
    backgroundColor: theme.palette.accent.main,
    height: '100%',
  },
  category: {
    margin: '4px 0 0 0',
    color: theme.palette.text.secondary,
  },
};
export function DiscountItem({ discount }: Props) {
  return (
    <Grid item xs={4}>
      <Typography sx={sx.title} variant="subtitle1">
        {discount.title}
      </Typography>
      <Typography sx={sx.percent} variant="subtitle1">
        {discount.percent} %
      </Typography>

      <Box sx={sx.progress}>
        <div style={{ ...sx.progressFill, width: `${discount.percent}%` }} />
      </Box>
      <Typography sx={sx.category} variant="caption">
        {discount.category}
      </Typography>
    </Grid>
  );
}
