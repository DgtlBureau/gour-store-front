import React, { ReactNode } from 'react';

import { Paper } from '@mui/material';

import { LinkRef as Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import ArrowIcon from '@mui/icons-material/ArrowForwardIos';

import { Box } from '../../Box/Box';
import sx from './Card.styles';

export type InfoCardProps = {
  title: string;
  footerText: string;
  href: string;
  children: ReactNode;
};

export function InfoCard({ title, footerText, href, children }: InfoCardProps) {
  return (
    <Paper sx={sx.card}>
      <Box sx={sx.content}>
        <Typography variant='h5' sx={sx.title}>
          {title}
        </Typography>
        <Box sx={sx.children}>{children}</Box>
      </Box>

      <Link href={href} sx={sx.link}>
        <Typography variant='body1'>{footerText}</Typography>
        <ArrowIcon fontSize='small' />
      </Link>
    </Paper>
  );
}
