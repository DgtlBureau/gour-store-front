import NextLink from 'next/link';

import { ListItemButton, ListItemButtonProps } from '@mui/material';

export type ListItemLinkProps = {
  href: string;
} & Pick<ListItemButtonProps, 'children' | 'sx'>;

export function ListItemLink({ href, children, sx }: ListItemLinkProps) {
  return (
    <NextLink href={href} passHref>
      <ListItemButton component='a' sx={sx}>
        {children}
      </ListItemButton>
    </NextLink>
  );
}
