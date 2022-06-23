import { Box } from '../../UI/Box/Box';
import React, { ReactElement } from 'react';

type Props = { children: ReactElement };

const sx = {
  container: {
    padding: '16px',
    width: '100%',
    background: '#F4E7CE',
    borderRadius: '6px',
  },
};

export const DiscountsInfoBar = ({ children }: Props) => {
  return <Box sx={sx.container}>{children}</Box>;
};
