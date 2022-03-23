import React, { ReactNode, CSSProperties } from 'react';
import NextLink from 'next/link';

export type BlankLinkProps = {
  href: string;
  children: ReactNode;
  sx?: CSSProperties;
}

export function BlankLink({
  href,
  children,
  sx,
}: BlankLinkProps) {
  return (
    <NextLink href={href} passHref>
      <a
        href="replace"
        rel="noreferrer"
        target="_blank"
        style={sx}
      >
        {children}
      </a>
    </NextLink>
  );
}
