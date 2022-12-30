import { MutableRefObject } from 'react';

export const scrollTo = (ref: MutableRefObject<HTMLDivElement | null>) =>
  ref.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });

export const getCurrentPage = (pathname: string) => pathname.split('/')[1];
