import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';

import ArrowIcon from '@mui/icons-material/ArrowForwardIos';

import { Box } from '../../Box/Box';
import { Typography } from '../../Typography/Typography';

import sx from './Card.styles';

export type InfoCardProps = {
  title: string;
  footerText: string;
  children: ReactNode;
  onClickMore(): void;
};

export function InfoCard({ title, footerText, onClickMore, children }: InfoCardProps) {
  return (
    <Paper sx={sx.card}>
      <Box sx={sx.content}>
        <Typography variant="h5" sx={sx.title}>
          {title}
        </Typography>

        <Box sx={sx.children}>{children}</Box>
      </Box>

      <Box sx={sx.link} onClick={onClickMore}>
        <Typography variant="body1">{footerText}</Typography>
        <ArrowIcon fontSize="small" />
      </Box>
    </Paper>
  );
}
