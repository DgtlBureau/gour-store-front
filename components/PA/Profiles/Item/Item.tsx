import React, { memo, useMemo } from 'react';

import { Divider } from '@mui/material';

import { useAppNavigation } from 'components/Navigation';
import { Accordion, AccordionDetails, AccordionSummary } from 'components/UI/Accordion/Accordion';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { OrderProfileDto } from 'types/dto/order/profile.dto';
import { IOrderProfile } from 'types/entities/IOrderProfile';

import LocationIcon from '@mui/icons-material/LocationOnOutlined';

import { PAProfilesForm } from '../Form/Form';
import sx from './Item.styles';

export type PAProfilesItemProps = {
  id: number;
  isExpanded?: boolean;
  isMain?: boolean;
  cities: {
    value: number;
    label: string;
  }[];
  profile?: IOrderProfile;
  onExpand?: (id: number) => void;
  onSave: (data: OrderProfileDto, id: number) => void;
  onDelete: () => void;
};

export const PAProfilesItem = memo(
  ({ id, isExpanded, isMain, cities, profile, onExpand, onSave, onDelete }: PAProfilesItemProps) => {
    const { language } = useAppNavigation();

    const address = profile
      ? [
          profile.city.name[language],
          profile.street,
          profile.house,
          profile.apartment && `${language === 'ru' ? 'кв.' : 'apt.'} ${profile.apartment}`,
        ]
          .filter(it => !!it)
          .join(', ')
      : '';

    const defaultValues = useMemo(() => {
      if (!profile) return undefined;

      const {
        city: { id: cityId },
        id: _id,
        createdAt: _createdAt,
        ...fields
      } = profile;

      return {
        ...fields,
        cityId,
        isMain: !!isMain,
      };
    }, [profile, isMain]);

    const expandProfileItem = () => onExpand && onExpand(id);

    const saveProfile = (dto: OrderProfileDto) => onSave(dto, id);

    return profile ? (
      <Accordion expanded={isExpanded} onChange={expandProfileItem}>
        <AccordionSummary>
          <Box sx={sx.header}>
            <Box sx={{ ...sx.locationIcon, ...(isMain && sx.mainAddress) }}>
              <LocationIcon />
            </Box>

            <Typography variant='h5' sx={sx.title}>
              {profile?.title}
            </Typography>

            <Typography variant='body1' color='text.muted'>
              {address}
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Divider sx={sx.divider} />
          <PAProfilesForm defaultValues={defaultValues} cities={cities} onSave={saveProfile} onDelete={onDelete} />
        </AccordionDetails>
      </Accordion>
    ) : (
      <Box sx={sx.form}>
        <PAProfilesForm cities={cities} onSave={saveProfile} onDelete={onDelete} />
      </Box>
    );
  },
);
