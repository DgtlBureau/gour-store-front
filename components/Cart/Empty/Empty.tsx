import React, { ReactNode } from 'react';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { Button } from '../../UI/Button/Button';
import { defaultTheme as t } from '../../../themes';
import { Stack } from '@mui/material';

const sx = {
  container: {
    width: '100%',
  },
  notice: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    maxWidth: '490px',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: t.palette.text.secondary,
  },
  description: {
    textAlign: 'center',

    margin: '16px 0',

    fontSize: '16px',
  },
};

type Props = {
  title: string;
  children: ReactNode;
  btn?: {
    label: string;
    onClick: () => void;
  };
};

export function CartEmpty({ title, children, btn }: Props) {
  return (
    <Stack sx={sx.container} alignItems="center">
      <Stack sx={sx.notice}>
        <Typography variant="h5" sx={sx.title}>
          {title}
        </Typography>
        <Box sx={sx.description}>{children}</Box>
        {btn && <Button onClick={btn.onClick}>{btn.label}</Button>}
      </Stack>
    </Stack>
  );
}
