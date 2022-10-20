import React, { useEffect, useState } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Collapse, SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { CheckboxGroup } from 'components/UI/CheckboxGroup/CheckboxGroup';
import { ClickAwayListener } from 'components/UI/ClickAwayListener/ClickAwayListener';
import { Typography } from 'components/UI/Typography/Typography';

import { IOption } from 'types/entities/IOption';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { defaultTheme as theme } from 'themes';

import translations from './Multiselect.i18n.json';
import selectSx from './Multiselect.styles';
import { ProductFilterSelectItem } from './SelectItem';

export type FilterMultiselectProps = {
  title: string;
  selected: IOption['value'][];
  options: IOption[];
  isMobile?: boolean;
  sx?: SxProps;
  onChange(selected: IOption['value'][]): void;
};

export function ProductFilterMultiselect({ title, selected, options, isMobile, sx, onChange }: FilterMultiselectProps) {
  const { t } = useLocalTranslation(translations);

  const [selectedOptions, setSelectedOptions] = useState(selected);
  const [isDeployed, setIsDeployed] = useState(false);

  const applyOptions = () => {
    onChange(selectedOptions);
    setIsDeployed(false);
  };

  const resetOptions = () => {
    if (selectedOptions.length) onChange([]);
  };

  useEffect(() => {
    if (!selected.length) setSelectedOptions([]);
  }, [selected]);

  const changeOption = (value: string) => {
    const isSelected = selectedOptions.includes(value);
    const newSelectedList = isSelected ? selectedOptions.filter(it => it !== value) : [...selectedOptions, value];

    setSelectedOptions(newSelectedList);

    if (isMobile) onChange(newSelectedList);
  };

  const checkOption = (value: string) => selectedOptions?.includes(value);

  const summaryIcon =
    selected.length > 0 ? (
      <ClearIcon
        htmlColor={theme.palette.text.muted}
        fontSize='small'
        onClick={e => {
          e.stopPropagation();
          resetOptions();
        }}
      />
    ) : (
      <ExpandMoreIcon
        htmlColor={theme.palette.text.muted}
        fontSize='small'
        sx={{ ...(isDeployed && selectSx.rotatedArrow) }}
      />
    );

  return isMobile ? (
    <Accordion sx={{ ...selectSx.select, ...sx }}>
      <AccordionSummary expandIcon={summaryIcon}>
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

        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>{summaryIcon}</Box>
      </Box>

      <Collapse in={isDeployed} timeout='auto' unmountOnExit>
        <ClickAwayListener onClickAway={() => setIsDeployed(false)}>
          <Box sx={selectSx.list}>
            <CheckboxGroup
              sx={{ display: 'flex', flexDirection: 'column' }}
              selected={selectedOptions}
              options={options}
              onChange={value => changeOption(value)}
            />

            <Button size='small' onClick={applyOptions} sx={selectSx.applyBtn}>
              {t('apply')}
            </Button>
          </Box>
        </ClickAwayListener>
      </Collapse>
    </Box>
  );
}
