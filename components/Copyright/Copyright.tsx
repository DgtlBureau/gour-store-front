import NextLink from 'next/link';
import React from 'react';

import { SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './Copyright.i18n.json';

const copyrightSx = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: '25px',
    borderTop: '1px solid #F4E7CE',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: '13px',
    color: '#7E5F2F',
  },
  author: {
    textDecoration: 'underline',
  },
};

type CopyrightProps = {
  sx?: SxProps;
};

export function Copyright({ sx }: CopyrightProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <Box sx={{ ...copyrightSx.wrapper, ...sx } as SxProps}>
      <NextLink href='https://newshift.ru/' passHref>
        <a href='replace' rel='noreferrer' target='_blank' style={copyrightSx.link}>
          {t('developed')}
          &nbsp;
          <div style={copyrightSx.author}>{t('author')}</div>
        </a>
      </NextLink>
    </Box>
  );
}
