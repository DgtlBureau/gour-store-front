import React from 'react';

import { Box } from '../../UI/Box/Box';
import { defaultTheme as theme } from '../../../themes';

type Props = {
  image: string;
  onClickMore(): void;
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
    backgroundColor: '#EBEBEB;',
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
    backgroundColor: theme.palette.common.white,
    borderRadius: '6px',
  },
  btn: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.secondary,
    textTransform: 'none',

    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
};

export function PromotionCard({ image, onClickMore }: Props) {
  return (
    <Box sx={{ ...sx.box, backgroundImage: image ? `url(${image})` : 'none' }} onClick={onClickMore}>
      {}
    </Box>
  );
}
