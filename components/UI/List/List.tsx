import NextLink from 'next/link';
import { ReactNode } from 'react';

import { ListItemButton, SxProps } from '@mui/material';

export type ListItemLinkProps = {
  href: string;
  children: ReactNode;
  sx?: SxProps;
};

export function ListItemLink({ href, children, sx }: ListItemLinkProps) {
  return (
    <NextLink href={href} passHref>
      <ListItemButton component='a' sx={sx}>
        {children}
      </ListItemButton>
    </NextLink>
  );
}
