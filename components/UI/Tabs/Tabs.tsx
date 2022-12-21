import React, { SyntheticEvent } from 'react';

import { Tabs as MUITabs, SxProps, Tab } from '@mui/material';

import { LinkRef } from '../Link/Link';

const tabsListSx = {
  width: '100%',
  overflow: 'hidden',
};

const tabSx = {
  minWidth: 0,
};

export type TabsProps<T> = {
  value: T;
  options: {
    value: T;
    label: string;
  }[];
  withLink?: boolean;
  sx?: SxProps;
  onChange?: (val: T) => void;
};

export function Tabs<T = string | number>({ value, options, sx, withLink, onChange }: TabsProps<T>) {
  const changeTab = onChange ? (_e: SyntheticEvent<Element, Event>, newValue: T) => onChange(newValue) : undefined;

  return (
    <MUITabs
      color='accent.main'
      value={value}
      variant='scrollable'
      scrollButtons='auto'
      onChange={changeTab}
      sx={{ ...tabsListSx, ...sx }}
    >
      {options.map(option => (
        <Tab
          LinkComponent={LinkRef}
          key={String(option.value)}
          label={option.label}
          value={option.value}
          href={withLink ? String(option.value) : ''}
          color='secondary'
          sx={tabSx}
        />
      ))}
    </MUITabs>
  );
}
