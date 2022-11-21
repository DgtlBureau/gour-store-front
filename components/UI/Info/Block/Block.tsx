import React from 'react';

import { Paper, SxProps } from '@mui/material';

import { LinkRef as Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import infoSx from './Block.styles';

type Props = {
  title: string;
  actionText?: string;
  href?: string;
  sx?: SxProps;
  onClick?: () => void;
};

export function InfoBlock({ title, href = '#', actionText, sx, onClick }: Props) {
  const withAction = !!actionText && (!!href || !!onClick);

  return (
    <Paper sx={{ ...infoSx.block, ...sx } as SxProps} elevation={0}>
      <Typography sx={infoSx.text} color='text.muted' variant='body1'>
        {title}
      </Typography>

      {withAction && (
        <Link href={href} onClick={onClick}>
          {actionText}
        </Link>
      )}
    </Paper>
  );
}
