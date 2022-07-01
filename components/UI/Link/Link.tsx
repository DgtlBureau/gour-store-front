import React, { forwardRef, Ref } from 'react';
import NextLink, { LinkProps } from 'next/link';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

type LinkRef = HTMLAnchorElement;
type NextLinkProps = Omit<MuiLinkProps, 'href' | 'classes'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'>;

const Link = (
  { href, as, prefetch, ...props }: LinkProps,
  ref: Ref<LinkRef>
) => (
  <NextLink href={href} as={as} prefetch={prefetch} passHref>
    <MuiLink ref={ref} {...props} />
  </NextLink>
);

export const LinkRef = forwardRef<LinkRef, NextLinkProps>(Link);
