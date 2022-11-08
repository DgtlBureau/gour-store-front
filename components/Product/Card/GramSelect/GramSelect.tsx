import React, { useState } from 'react';

import { Collapse, List, ListItemButton, ListItemText, SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { ClickAwayListener } from 'components/UI/ClickAwayListener/ClickAwayListener';
import { Typography } from 'components/UI/Typography/Typography';

import { IOption } from 'types/entities/IOption';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { color } from 'themes';

import selectSx from './GramSelect.styles';

export type ProductCardGramSelectProps = {
  gram: number;
  options: IOption[];
  sx?: SxProps;
  onChange(gram: number): void;
};

export function ProductCardGramSelect({ gram, options, sx, onChange }: ProductCardGramSelectProps) {
  const [isDeployed, setIsDeployed] = useState(false);

  const checkOption = (value: number) => gram === value;

  const changeOption = (value: number) => {
    const isSelected = checkOption(value);

    if (!isSelected) onChange(value);

    setIsDeployed(false);
  };

  const collapseOptions = () => setIsDeployed(false);
  const toggleDeployOptions = () => setIsDeployed(prev => !prev);

  return (
    <Box sx={sx}>
      <Box sx={selectSx.extender} onClick={toggleDeployOptions}>
        <Typography variant='body1' sx={selectSx.title}>
          {gram}&nbsp;г
        </Typography>

        <ExpandMoreIcon htmlColor={color.muted} sx={{ ...(isDeployed && selectSx.rotatedArrow) }} fontSize='small' />
      </Box>

      <Collapse in={isDeployed} timeout='auto' unmountOnExit>
        <ClickAwayListener onClickAway={collapseOptions}>
          <List sx={selectSx.list}>
            {options.map(option => (
              <ListItemButton
                selected={+option.value === gram}
                onClick={() => changeOption(+option.value)}
                key={option.value}
              >
                <ListItemText primary={option.label} />
              </ListItemButton>
            ))}
          </List>
        </ClickAwayListener>
      </Collapse>
    </Box>
  );
}
