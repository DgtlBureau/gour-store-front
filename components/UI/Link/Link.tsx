import NextLink, { LinkProps } from 'next/link';
import React, { Ref, forwardRef } from 'react';

import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

type LinkRef = HTMLAnchorElement;
type NextLinkProps = Omit<MuiLinkProps, 'href' | 'classes'> & Pick<LinkProps, 'href' | 'as' | 'prefetch'>;

function Link({ href, as, prefetch, ...props }: LinkProps, ref: Ref<LinkRef>) {
  return (
    <NextLink href={href} as={as} prefetch={prefetch} passHref>
      <MuiLink ref={ref} {...props} />
    </NextLink>
  );
}

export const LinkRef = forwardRef<LinkRef, NextLinkProps>(Link);
