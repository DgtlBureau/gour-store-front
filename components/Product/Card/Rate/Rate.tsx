import React from 'react';

import { SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import StarIcon from '@mui/icons-material/Star';

import rateSx from './Rate.styles';

type ProductCardRateProps = {
  rating: number;
  stockLabel: string;
  sx?: SxProps;
};

export function ProductCardRate({ rating, stockLabel, sx }: ProductCardRateProps) {
  return (
    <Box sx={{ ...rateSx.box, ...sx }}>
      <Box sx={rateSx.rating}>
        <StarIcon fontSize='small' sx={rateSx.star} />
        <Typography variant='body2' sx={rateSx.text}>
          {rating}
        </Typography>
      </Box>

      <Typography variant='caption' sx={rateSx.stock}>
        {stockLabel}
      </Typography>
    </Box>
  );
}
