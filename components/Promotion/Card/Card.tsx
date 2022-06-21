import React from 'react';

import { Box } from '../../UI/Box/Box';
import { Button } from '../../UI/Button/Button';
import { Typography } from '../../UI/Typography/Typography';
import { defaultTheme as theme } from '../../../themes';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import translations from './Card.i18n.json';

type Props = {
  title?: string;
  image: string;
  onClickMore(): void;
};

const sx = {
  box: {
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
  const { t } = useLocalTranslation(translations);

  return (
    <Box sx={{ ...sx.box, backgroundImage: image ? `url(${image})` : 'none' }}>
      <Button size="small" onClick={onClickMore} sx={sx.btn}>
        {t('more')}
      </Button>
    </Box>
  );
}
