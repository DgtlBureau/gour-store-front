import React from 'react';

import translations from './LkOrderProfileItem.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from '@mui/material';
import { Typography } from '../../UI/Typography/Typography';
import { Button } from '../../UI/Button/Button';

import PlaceIcon from '@mui/icons-material/Place';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '../../UI/IconButton/IconButton';
import { LkOrderProfileForm, OrderProfile } from './LkOrderProfileForm';

export type LkOrderProfileItemProps = {
  isOpened: boolean;
  orderProfile: OrderProfile;
  cities: {
    value: number;
    label: string;
  }[];
  onClick(): void;
  onClose(): void;
  onSave(orderProfile: OrderProfile): void;
  onRemove(): void;
};

export function LkOrderProfileItem({
  isOpened,
  orderProfile,
  cities,
  onClick,
  onClose,
  onSave,
  onRemove,
}: LkOrderProfileItemProps) {
  const { title, street, house } = orderProfile;

  return (
    <Accordion
      onChange={(_, expanded) => {
        expanded ? onClick() : onClose();
      }}
    >
      <Stack
        sx={{ width: '100%' }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <AccordionSummary sx={{ width: '100%' }}>
          <Stack
            sx={{ width: '100%' }}
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <PlaceIcon />
            <Typography variant="h6">
              <b>{title}</b>
            </Typography>
            <Typography variant="body1">
              {street}, {house}
            </Typography>
          </Stack>
          {!isOpened && (
            <IconButton>
              <EditIcon />
            </IconButton>
          )}
        </AccordionSummary>
        {isOpened && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={onRemove}>
              <DeleteForeverIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>

      <AccordionDetails>
        <LkOrderProfileForm
          orderProfile={orderProfile}
          cities={cities}
          onSave={onSave}
        />
      </AccordionDetails>
    </Accordion>
  );
}
