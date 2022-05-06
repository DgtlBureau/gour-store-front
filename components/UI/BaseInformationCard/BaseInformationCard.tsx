import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';

import ArrowIcon from '@mui/icons-material/ArrowForwardIos';

import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';

import sx from './BaseInformation.styles';

export type BaseInformationCardProps = {
  title: string;
  footerText: string;
  onClickMore(): void;
  children: ReactNode;
};

export function BaseInformationCard({
  title,
  footerText,
  onClickMore,
  children,
}: BaseInformationCardProps) {
  return (
    <Paper sx={sx.card}>
      <Box sx={sx.content}>
        <Typography variant="h5" sx={sx.title}>
          {title}
        </Typography>
        {children}
      </Box>
      <Box sx={sx.link} onClick={onClickMore}>
        <Typography variant="body1">
          {footerText}
        </Typography>
        <ArrowIcon fontSize="small" />
      </Box>
    </Paper>
  );
}
