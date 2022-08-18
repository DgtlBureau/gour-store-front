import React, { ReactNode } from 'react';

import { Stack } from '@mui/material';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { Button } from 'components/UI/Button/Button';
import { defaultTheme as t } from 'themes';

const sx = {
  container: {
    width: '100%',
  },
  notice: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: {
      sm: 'center',
      xs: 'flex-start',
    },

    maxWidth: '490px',
  },
  title: {
    textAlign: {
      sm: 'center',
      xs: 'none',
    },
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    color: t.palette.text.secondary,
  },
  description: {
    textAlign: {
      sm: 'center',
      xs: 'none',
    },

    margin: '16px 0',

    fontSize: '16px',
  },
  btn: {
    width: {
      xs: '100%',
      sm: 'fit-content',
    },
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
    <Stack sx={sx.container} alignItems='center'>
      <Stack sx={sx.notice}>
        <Typography variant='h5' sx={sx.title}>
          {title}
        </Typography>

        <Box sx={sx.description}>{children}</Box>

        {btn && (
          <Button onClick={btn.onClick} sx={sx.btn}>
            {btn.label}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
