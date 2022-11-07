import React from 'react';

import {
  Pagination as MUIPagination,
  PaginationProps as MUIPaginationProps,
  PaginationItem,
  SxProps,
} from '@mui/material';

import { color } from 'themes';

const paginationSx = {
  item: {
    color: color.muted,
    '&.Mui-selected': {
      color: color.primary,
    },
  },
};

type PaginationProps = {
  page: number;
  count: number;
  shape?: MUIPaginationProps['shape'];
  size?: MUIPaginationProps['size'];
  sx?: SxProps;
  onChange: (value: number) => void;
};

export function Pagination({ page, count, shape = 'rounded', size, sx, onChange }: PaginationProps) {
  return (
    <MUIPagination
      color='secondary'
      page={page}
      count={count}
      shape={shape}
      size={size}
      sx={{ ...paginationSx, ...sx }}
      onChange={(_, value) => onChange(value)}
      renderItem={params => <PaginationItem {...params} sx={paginationSx.item} />}
    />
  );
}
