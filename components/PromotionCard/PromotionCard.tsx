import React from 'react';

import { Box } from '../UI/Box/Box';
import { Button } from '../UI/Button/Button';
import { Typography } from '../UI/Typography/Typography';
import { defaultTheme as theme } from '../../themes';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import translations from './PromotionCard.i18n.json';

type Props = {
  title?: string;
  image: string;
  onClickMore(): void;
};

const sx = {
  box: {
    width: '293px',
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
    textTransform: 'none',
    boxSizing: 'border-box',
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
    }
  },
};

export function PromotionCard({ title, image, onClickMore }: Props) {
  const { t } = useLocalTranslation(translations);

  return (
    <Box sx={{ ...sx.box, backgroundImage: image ? `url(${image})` : 'none' }}>
      <Typography variant="subtitle1" sx={sx.title}>{title}</Typography>
      <Button size="small" onClick={onClickMore} sx={sx.btn}>
        {t('more')}
      </Button>
    </Box>
  );
}
