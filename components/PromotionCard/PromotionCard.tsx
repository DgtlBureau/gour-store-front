import React, { CSSProperties } from 'react';

import { Box } from '../UI/Box/Box';
import { Button } from '../UI/Button/Button';
import { Typography } from '../UI/Typography/Typography';
import { defaultTheme as t } from '../../themes';

type Props = {
  title: string;
  image: string;
  onMoreClick(): void;
};

const sx = {
  box: {
    width: '285px',
    height: '156px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#EBEBEB;',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundImage: 'image',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: '26px 18px 13px 18px',
  },
  title: {
    padding: '5px',
    backgroundColor: t.palette.common.white,
    borderRadius: '6px',
  },
  btn: {
    backgroundColor: t.palette.common.white,
    color: t.palette.text.secondary,

    '&:hover': {
      backgroundColor: t.palette.secondary.main,
    }
  },
};

export function PromotionCard({ title, image, onMoreClick }: Props) {
  return (
    <Box sx={{ ...sx.box, backgroundImage: image ? `url(${image})` : 'none' }}>
      <Typography variant="subtitle1" sx={sx.title}>{title}</Typography>
      <Button size="small" onClick={onMoreClick} sx={sx.btn}>
        подробнее
      </Button>
    </Box>
  );
}
