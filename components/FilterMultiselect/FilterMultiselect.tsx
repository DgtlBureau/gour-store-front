import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Typography,
} from '@mui/material';
import React, { CSSProperties, useState } from 'react';
import s from './FilterMultiselect.module.scss';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type FilterMultiselectProps = {
  title: string;
  selected: string[];
  options: {
    label: string;
    value: string;
  }[];
  onChange(selected: string[]): void;
};

const optionBoxStyle: CSSProperties = {
  padding: '7px 11px',
  color: '#778192',
  backgroundColor: '#fff',
  borderRadius: '6px',
  userSelect: 'none',
  cursor: 'pointer'
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
    <Accordion sx={{ bgcolor: '#EBEBEB' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', columnGap: '6px' }}>
        {options.map(option => (
          <Typography
            key={option.value}
            onClick={() => {
              onChangeOption(option.value);
            }}
            sx={optionBoxStyle}
            className={`${isOptionSelected(option.value) ? s.selected : ''}`}
          >
            {option.label}
          </Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
