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
  SxProps,
} from '@mui/material';
import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import translations from './Multiselect.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { Box } from '../../../UI/Box/Box';
import { Typography } from '../../../UI/Typography/Typography';
import { Button } from '../../../UI/Button/Button';
import { Checkbox } from '../../../UI/Checkbox/Checkbox';
import { defaultTheme as theme } from '../../../../themes';

import selectSx from './Multiselect.styles';

export type FilterMultiselectProps = {
  title: string;
  selected: string[];
  options: {
    label: string;
    value: string;
  }[];
  isMobile?: boolean;
  sx?: SxProps;
  onChange(selected: string[]): void;
};

export function ProductFilterMultiselect({ title, selected, options, isMobile, sx, onChange }: FilterMultiselectProps) {
  const { t } = useLocalTranslation(translations);

  const [selectedOptions, setSelectedOptions] = useState<string[]>(selected);
  const [isDeployed, setIsDeployed] = useState(false);

  const resetOptions = () => setSelectedOptions([]);
  const applyOptions = () => {
    onChange(selectedOptions);
    setIsDeployed(false);
  };

  function changeOption(selected: string) {
    const isOptionSelected = selectedOptions.find(option => option === selected);

    const newSelectedList = isOptionSelected
      ? [...selectedOptions].filter(option => option !== selected)
      : [...selectedOptions, selected];

    setSelectedOptions(newSelectedList);

    if (isMobile) onChange(newSelectedList);
  }

  function isOptionSelected(currentOption: string) {
    return selectedOptions.find(option => option === currentOption);
  }

  return isMobile ? (
    <Accordion sx={{ ...selectSx.select, ...sx }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon htmlColor={theme.palette.text.muted} />}>
        <Typography variant="body1" sx={selectSx.title}>
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {options.map(option => (
          <Typography
            variant="body1"
            key={option.value}
            onClick={() => changeOption(option.value)}
            sx={{
              ...selectSx.optionBox,
              ...(isOptionSelected(option.value) && selectSx.selected),
            }}
          >
            {option.label}
          </Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  ) : (
    <Box sx={sx}>
      <Box sx={selectSx.extender} onClick={() => setIsDeployed(!isDeployed)}>
        <Typography variant="body1" sx={{ ...selectSx.title, userSelect: 'none' }}>
          {title}
        </Typography>
        <ExpandMoreIcon htmlColor={theme.palette.text.muted} sx={{ ...(isDeployed && selectSx.rotatedArrow) }} />
      </Box>

      <Collapse in={isDeployed} timeout="auto" unmountOnExit>
        <ClickAwayListener onClickAway={() => setIsDeployed(false)}>
          <List sx={selectSx.list}>
            {options.map(option => (
              <ListItem key={option.value} onClick={() => changeOption(option.value)} disablePadding>
                <ListItemButton role={undefined} dense>
                  <ListItemIcon sx={selectSx.listItemIcon}>
                    <Checkbox
                      sx={selectSx.checkbox}
                      edge="start"
                      value={selectedOptions.includes(option.value)}
                      disableRipple
                    />
                  </ListItemIcon>
                  <Typography variant="body2" sx={selectSx.listItemText}>
                    {option.label}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
            <Box sx={selectSx.actions}>
              <Button size="small" variant="outlined" onClick={resetOptions}>
                {t('reset')}
              </Button>
              <Button size="small" onClick={applyOptions} sx={selectSx.applyBtn}>
                {t('apply')}
              </Button>
            </Box>
          </List>
        </ClickAwayListener>
      </Collapse>
    </Box>
  );
}
