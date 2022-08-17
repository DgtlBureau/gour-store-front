import React from 'react';
import { Divider } from '@mui/material';

import LocationIcon from '@mui/icons-material/LocationOnOutlined';

import { useAppNavigation } from 'components/Navigation';
import { PAProfilesForm } from '../Form/Form';
import { Accordion, AccordionSummary, AccordionDetails } from '../../../UI/Accordion/Accordion';
import { Box } from '../../../UI/Box/Box';
import { Typography } from '../../../UI/Typography/Typography';
import { IOrderProfile } from '../../../../@types/entities/IOrderProfile';
import { OrderProfileDto } from '../../../../@types/dto/order/profile.dto';

import sx from './Item.styles';

export type PAProfilesItemProps = {
  isExpanded?: boolean;
  isMain?: boolean;
  cities: {
    value: number;
    label: string;
  }[];
  profile?: IOrderProfile;
  onExpand?: () => void;
  onSave: (data: OrderProfileDto) => void;
  onDelete: () => void;
};

export function PAProfilesItem({
  isExpanded,
  isMain,
  cities,
  profile,
  onExpand,
  onSave,
  onDelete,
}: PAProfilesItemProps) {
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

  const convertToOrderProfile = ({
    city: { id: cityId },
    id,
    createdAt,
    ...fields
  }: IOrderProfile): OrderProfileDto => ({
    ...fields,
    cityId,
    isMain: !!isMain,
  });

  return profile ? (
    <Accordion expanded={isExpanded} onChange={onExpand}>
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
        <PAProfilesForm
          defaultValues={profile && convertToOrderProfile(profile)}
          cities={cities}
          onSave={onSave}
          onDelete={onDelete}
        />
      </AccordionDetails>
    </Accordion>
  ) : (
    <Box sx={sx.form}>
      <PAProfilesForm cities={cities} onSave={onSave} onDelete={onDelete} />
    </Box>
  );
}
