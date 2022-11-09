import React, { useState } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Collapse, SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { ClickAwayListener } from 'components/UI/ClickAwayListener/ClickAwayListener';
import { RadioGroup } from 'components/UI/RadioGroup/RadioGroup';
import { Typography } from 'components/UI/Typography/Typography';

import { IOption } from 'types/entities/IOption';

import { color } from 'themes';

import { ProductFilterSelectItem } from '../Multiselect/SelectItem';
import selectSx from './Select.styles';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type FilterSelectProps = {
  title: string;
  selected: string;
  options: IOption[];
  isDesktop?: boolean;
  sx?: SxProps;
  onChange(selected: IOption['value']): void;
};

export function ProductFilterSelect({ title, selected, options, isDesktop, sx, onChange }: FilterSelectProps) {
  const [isDeployed, setIsDeployed] = useState(false);

  const checkOption = (value: IOption['value']) => selected === value;

  const changeOption = (value: IOption['value']) => {
    const isSelected = checkOption(value);

    if (!isSelected) onChange(value);

    setIsDeployed(false);
  };

  return !isDesktop ? (
    <Accordion sx={{ ...selectSx.select, ...sx }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon htmlColor={color.muted} />}>
        <Typography variant='body1' sx={selectSx.title}>
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {options.map(option => (
          <ProductFilterSelectItem
            key={option.value}
            isSelected={checkOption(option.value)}
            title={option.label}
            onSelect={() => changeOption(option.value)}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  ) : (
    <Box sx={sx}>
      <Box sx={selectSx.extender} onClick={() => setIsDeployed(!isDeployed)}>
        <Typography variant='body1' sx={{ ...selectSx.title, whiteSpace: 'nowrap', userSelect: 'none' }}>
          {title}
        </Typography>

        <ExpandMoreIcon
          htmlColor={color.muted}
          sx={{ ...(isDeployed && selectSx.rotatedArrow), marginLeft: '8px' }}
          fontSize='small'
        />
      </Box>

      <Collapse in={isDeployed} timeout='auto' unmountOnExit>
        <ClickAwayListener onClickAway={() => setIsDeployed(false)}>
          <RadioGroup
            sx={selectSx.list}
            selected={selected}
            options={options}
            onChange={value => changeOption(value)}
          />
        </ClickAwayListener>
      </Collapse>
    </Box>
  );
}
