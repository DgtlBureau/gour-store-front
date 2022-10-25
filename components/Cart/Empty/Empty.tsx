import React, { ReactNode } from 'react';

import { Stack } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import sx from './Empty.styles';

type Props = {
  title: string;
  children?: ReactNode;
  actionText?: string;
  onClick?: () => void;
};

export function CartEmpty({ title, children, actionText, onClick }: Props) {
  const withAction = !!actionText && onClick;

  return (
    <Stack sx={sx.container} alignItems='center'>
      <Stack sx={sx.notice}>
        <Typography variant='h5' sx={sx.title}>
          {title}
        </Typography>

        {children && <Box sx={sx.description}>{children}</Box>}

        {withAction && (
          <Button onClick={onClick} sx={sx.btn}>
            {actionText}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
