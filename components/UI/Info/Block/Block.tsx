import React from 'react';

import { Paper, SxProps } from '@mui/material';

import { LinkRef as Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

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
    path?: string;
    onClick?: () => void;
  };
};

export function InfoBlock({ text, link, sx }: Props) {
  return (
    <Paper sx={{ ...infoSx.block, ...sx }} elevation={0}>
      <Typography sx={infoSx.text} color='text.muted' variant='body1'>
        {text}
      </Typography>
      {link && (
        <Link href={link.path || '#'} onClick={link.onClick}>
          {link.label}
        </Link>
      )}
    </Paper>
  );
}
