import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { defaultTheme as t } from '../../themes';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const sx = {
  select: {
    backgroundColor: 'background.paper',
  },
  optionBox: {
    padding: '7px 11px',
    color: t.palette.text.secondary,
    backgroundColor: t.palette.common.white,
    borderRadius: '6px',
    userSelect: 'none',
    cursor: 'pointer'
  },
  selected: {
    background: t.palette.primary.main,
    color: t.palette.common.white,
  },
};

export type FilterMultiselectProps = {
  title: string;
  selected: string[];
  options: {
    label: string;
    value: string;
  }[];
  onChange(selected: string[]): void;
};

export function FilterMultiselect({
  title,
  selected,
  options,
  onChange,
}: FilterMultiselectProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selected);

  function onChangeOption(selected: string) {
    const isOptionSelected = selectedOptions.find(
      option => option === selected
    );

    if (isOptionSelected) {
      const newSelectedList = [...selectedOptions].filter(
        option => option !== selected
      );
      setSelectedOptions(newSelectedList);
      onChange(selectedOptions);
      return;
    }

    setSelectedOptions(oldSelectedList => [...oldSelectedList, selected]);
    onChange(selectedOptions);
  }

  function isOptionSelected(currentOption: string) {
    return selectedOptions.find(option => option === currentOption);
  }

  return (
    <Accordion sx={sx.select}>
      <AccordionSummary expandIcon={<ExpandMoreIcon htmlColor={t.palette.text.muted} />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', columnGap: '6px' }}>
        {options.map(option => (
          <Typography
            key={option.value}
            onClick={() => {
              onChangeOption(option.value);
            }}
            sx={{ ...sx.optionBox, ...(isOptionSelected(option.value) && sx.selected) }}
          >
            {option.label}
          </Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
