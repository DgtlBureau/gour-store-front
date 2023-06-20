import React from 'react';

import { Box } from 'components/UI/Box/Box';

import { color, defaultTheme as theme } from 'themes';

type Props = {
  image: string;
  onClickMore(): void;
  changeWidth?: string;
};

const sx = {
  box: {
    cursor: 'pointer',
    width: '300px',
    height: '160px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: '#EBEBEB',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundImage: 'image',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: '24px 18px 14px 18px',
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      width: '169px',
      height: '95px',
      padding: '10px',
    },
  },
  title: {
    padding: '5px',
    backgroundColor: color.white,
    borderRadius: '6px',
  },
  btn: {
    backgroundColor: color.white,
    color: color.primary,
    textTransform: 'none',

    '&:hover': {
      backgroundColor: color.secondary,
    },
  },
};

export function PromotionCard({ image, onClickMore,changeWidth }: Props) {
  return (
    <Box sx={{ ...sx.box, backgroundImage: image ? `url(${image})` : 'none', width: (changeWidth || '300px' )  }} onClick={onClickMore}>
      {}
    </Box>
  );
}
