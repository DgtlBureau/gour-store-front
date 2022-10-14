import React, { useState } from 'react';

import { Collapse, List, ListItemButton, ListItemText, SxProps, useMediaQuery } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { ClickAwayListener } from 'components/UI/ClickAwayListener/ClickAwayListener';
import { Typography } from 'components/UI/Typography/Typography';

import { IOption } from 'types/entities/IOption';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { defaultTheme as theme } from 'themes';

import selectSx from './GramSelect.styles';

export type ProductCardGramSelectProps = {
  gram: number;
  options: IOption[];
  showTitleOnTablets?: boolean;
  sx?: SxProps;
  onChange(gram: number): void;
};

export function ProductCardGramSelect({
  gram,
  options,
  showTitleOnTablets = false,
  sx,
  onChange,
}: ProductCardGramSelectProps) {
  const [isDeployed, setIsDeployed] = useState(false);

  const isMobileAndTablet = useMediaQuery('(max-width: 900px)');

  const checkOption = (value: number) => gram === value;

  const changeOption = (value: number) => {
    const isSelected = checkOption(value);

    if (!isSelected) onChange(value);

    setIsDeployed(false);
  };

  const showLabel = isMobileAndTablet ? showTitleOnTablets : true;

  return (
    <Box sx={sx}>
      <Box sx={selectSx.extender} onClick={() => setIsDeployed(!isDeployed)}>
        {showLabel && (
          <Typography variant='body1' sx={{ ...selectSx.title, whiteSpace: 'nowrap', userSelect: 'none' }}>
            {gram}г
          </Typography>
        )}

        <ExpandMoreIcon
          htmlColor={theme.palette.text.muted}
          sx={{ ...(isDeployed && selectSx.rotatedArrow) }}
          fontSize='small'
        />
      </Box>

      <Collapse in={isDeployed} timeout='auto' unmountOnExit>
        <ClickAwayListener onClickAway={() => setIsDeployed(false)}>
          <List sx={selectSx.list}>
            {options.map(option => (
              <ListItemButton selected={+option.value === gram} onClick={() => changeOption(+option.value)}>
                <ListItemText primary={option.label} />
              </ListItemButton>
            ))}
          </List>
        </ClickAwayListener>
      </Collapse>
    </Box>
  );
}
