import React from 'react';
import { Paper, SxProps } from '@mui/material';

import { Typography } from '../../Typography/Typography';
import { Link as CustomLink } from '../../Link/Link';

const infoSx = {
  block: {
    padding: '16px',
    backgroundColor: 'background.default',
    border: '1px solid',
    borderColor: 'secondary.main',
  },
  text: {
    marginBottom: '10px',
  },
};

type Props = {
  sx?: SxProps;
  text: string;
  link?: {
    label: string;
    path: string;
  };
};

export function InfoBlock({ text, link, sx }: Props) {
  return (
    <Paper sx={{ ...infoSx.block, ...sx }} elevation={0}>
      <Typography sx={infoSx.text} color="text.muted" variant="body1">
        {text}
      </Typography>
      {link && <CustomLink path={link.path}>{link.label}</CustomLink>}
    </Paper>
  );
}
