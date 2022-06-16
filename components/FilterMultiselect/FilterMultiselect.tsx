import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ClickAwayListener,
} from '@mui/material';
import React, { useState } from 'react';

import translations from './FilterMultiSelect.i18n.json';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { Button } from '../UI/Button/Button';
import { Checkbox } from '../UI/Checkbox/Checkbox';
import { defaultTheme as theme } from '../../themes';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import sx from './FilterMultiSelect.styles';

export type FilterMultiselectProps = {
  title: string;
  selected: string[];
  options: {
    label: string;
    value: string;
  }[];
  isMobile?: boolean;
  onChange(selected: string[]): void;
};

export function FilterMultiselect({ title, selected, options, isMobile, onChange }: FilterMultiselectProps) {
  const { t } = useLocalTranslation(translations);

  const [selectedOptions, setSelectedOptions] = useState<string[]>(selected);
  const [isDeployed, setIsDeployed] = useState(false);

  const resetOptions = () => setSelectedOptions([]);
  const applyOptions = () => onChange(selectedOptions);

  function changeOption(selected: string) {
    const isOptionSelected = selectedOptions.find(option => option === selected);

    if (isOptionSelected) {
      const newSelectedList = [...selectedOptions].filter(option => option !== selected);
      setSelectedOptions(newSelectedList);
      if (isMobile) onChange(selectedOptions);
      return;
    }

    setSelectedOptions(oldSelectedList => [...oldSelectedList, selected]);

    if (isMobile) onChange(selectedOptions);
  }

  function isOptionSelected(currentOption: string) {
    return selectedOptions.find(option => option === currentOption);
  }

  return isMobile ? (
    <Accordion sx={sx.select}>
      <AccordionSummary expandIcon={<ExpandMoreIcon htmlColor={theme.palette.text.muted} />}>
        <Typography variant="body1" sx={sx.title}>
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ display: 'flex', columnGap: '6px' }}>
        {options.map(option => (
          <Typography
            variant="body1"
            key={option.value}
            onClick={() => changeOption(option.value)}
            sx={{ ...sx.optionBox, ...(isOptionSelected(option.value) && sx.selected) }}
          >
            {option.label}
          </Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  ) : (
    <Box>
      <Box sx={sx.extender} onClick={() => setIsDeployed(!isDeployed)}>
        <Typography variant="body1" sx={{ ...sx.title, userSelect: 'none' }}>
          {title}
        </Typography>
        <ExpandMoreIcon htmlColor={theme.palette.text.muted} sx={{ ...(isDeployed && sx.rotatedArrow) }} />
      </Box>

      <Collapse in={isDeployed} timeout="auto" unmountOnExit>
        <ClickAwayListener onClickAway={() => setIsDeployed(false)}>
          <List sx={sx.list}>
            {options.map(option => (
              <ListItem key={option.value} onClick={() => changeOption(option.value)} disablePadding>
                <ListItemButton role={undefined} dense>
                  <ListItemIcon sx={sx.listItemIcon}>
                    <Checkbox
                      sx={sx.checkbox}
                      edge="start"
                      value={selectedOptions.includes(option.value)}
                      disableRipple
                    />
                  </ListItemIcon>
                  <Typography variant="body2" sx={sx.listItemText}>
                    {option.label}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}

            <Box sx={sx.actions}>
              <Button size="small" variant="outlined" onClick={resetOptions}>
                {t('reset')}
              </Button>
              <Button size="small" onClick={applyOptions} sx={sx.applyBtn}>
                {t('apply')}
              </Button>
            </Box>
          </List>
        </ClickAwayListener>
      </Collapse>
    </Box>
  );
}
