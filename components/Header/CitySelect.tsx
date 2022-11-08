import React from 'react';

import { Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import { color } from 'themes';

import translations from './CitySelect.i18n.json';

const paperSx = {
  backgroundColor: color.white,
  color: color.primary,
};

type Props = {
  isOpen: boolean;
  cities: {
    id: number;
    name: string;
  }[];
  selected: number;
  onSelect: (id: number) => void;
  onClose: () => void;
};

export function CitySelect({ isOpen, cities, selected, onSelect, onClose }: Props) {
  const { t } = useLocalTranslation(translations);

  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ sx: paperSx }}>
      <DialogTitle>{t('cities')}</DialogTitle>

      <DialogContent sx={{ width: 500 }}>
        <Grid container spacing={2}>
          {cities.map(city => (
            <Grid item xs={12} md={4} onClick={() => onSelect(city.id)} key={city.id}>
              <Typography
                sx={{ cursor: 'pointer' }}
                variant='body1'
                color={city.id === selected ? color.accent : 'inherit'}
              >
                {city.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
