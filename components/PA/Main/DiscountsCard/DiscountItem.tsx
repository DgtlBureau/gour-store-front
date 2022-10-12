import React from 'react';

import { Grid } from '@mui/material';

import { useAppNavigation } from 'components/Navigation';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { formatCategoriesWithMaxDiscount } from 'pages/personal-area/personalAreaHelper';
import { defaultTheme as theme } from 'themes';

type Props = {
  discount: ReturnType<typeof formatCategoriesWithMaxDiscount>[number];
};

const sx = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: {
      xs: '14px',
      xl: '14px',
    },
    color: theme.palette.text.primary,
  },
  percentBlock: {
    marginTop: 'auto',
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
    color: theme.palette.text.muted,
  },
};

export function DiscountItem({ discount }: Props) {
  const { language } = useAppNavigation();
  const discountPercent = Math.floor(discount.category.discountPrice / 100_000);

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} sx={sx.container}>
      <Typography sx={sx.title} variant='subtitle1'>
        {discount.title[language]}
      </Typography>
      <Box sx={sx.percentBlock}>
        <Typography sx={sx.percent} variant='subtitle1'>
          {discountPercent} %
        </Typography>

        <Box sx={sx.progress}>
          <div style={{ ...sx.progressFill, width: `${discountPercent}%` }} />
        </Box>
        <Typography sx={sx.category} variant='caption'>
          {discount.category.title[language]}
        </Typography>
      </Box>
    </Grid>
  );
}
