import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { IOption } from 'types/entities/IOption';

import sx from './Menu.styles';

export type PAMenuProps = {
  active: string;
  options: IOption[];
};

export function PAMenu({ active, options }: PAMenuProps) {
  const currentChapter = options.find(it => it.value === active);

  return (
    <Box sx={sx.menu}>
      <Typography variant='h4' sx={sx.title}>
        {currentChapter?.label}
      </Typography>

      <Box sx={sx.list}>
        {options.map(option => (
          <Link
            key={option.value}
            href={option.value}
            variant='body1'
            sx={{ ...sx.listItem, ...(option.value === active && sx.active) }}
          >
            {option.label}
          </Link>
        ))}
      </Box>
    </Box>
  );
}
