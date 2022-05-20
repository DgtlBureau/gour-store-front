import React, { ReactNode } from 'react';
import translations from './BaseInformationCard.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Paper } from '@mui/material';
import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';
import sx from './BaseInformation.styles';
import ArrowIcon from '@mui/icons-material/ArrowForwardIos';

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

        <Box sx={sx.children}>{children}</Box>
      </Box>
      <Box sx={sx.link} onClick={onClickMore}>
        <Typography variant="body1">{footerText}</Typography>
        <ArrowIcon fontSize="small" />
      </Box>
    </Paper>
  );
}
