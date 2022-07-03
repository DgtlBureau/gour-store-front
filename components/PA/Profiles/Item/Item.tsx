import React from 'react';
import { useRouter } from 'next/router';
import { Divider } from '@mui/material';

import LocationIcon from '@mui/icons-material/LocationOnOutlined';

import { PAProfilesForm } from '../Form/Form';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '../../../UI/Accordion/Accordion';
import { Box } from '../../../UI/Box/Box';
import { Typography } from '../../../UI/Typography/Typography';
import { IOrderProfile } from '../../../../@types/entities/IOrderProfile';
import { OrderProfileDto } from '../../../../@types/dto/order/profile.dto';
import { LocalConfig } from 'hooks/useLocalTranslation';

import sx from './Item.styles';
import { getFullAddress } from 'utils/getFullAddress';

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
  const router = useRouter();

  const locale: keyof LocalConfig =
    (router?.locale as keyof LocalConfig) || 'ru';

  const address = profile
    ? getFullAddress(
        profile.city.name[locale],
        profile.street,
        profile.house,
        profile.apartment &&
          `${locale === 'ru' ? 'кв.' : 'apt.'} ${profile.apartment}`
      )
    : '';

  const convertToOrderProfile = (profile: IOrderProfile) =>
    ({
      title: profile.title,
      cityId: profile.city.id,
      street: profile.street,
      house: profile.house,
      apartment: profile.apartment,
      entrance: profile.entrance,
      floor: profile.floor,
      comment: profile.comment,
      isMain,
    } as OrderProfileDto);

  return !!profile ? (
    <Accordion expanded={isExpanded} onChange={onExpand}>
      <AccordionSummary>
        <Box sx={sx.header}>
          <Box sx={{ ...sx.locationIcon, ...(isMain && sx.mainAddress) }}>
            <LocationIcon />
          </Box>

          <Typography variant="h5" sx={sx.title}>
            {profile?.title}
          </Typography>

          <Typography variant="body1" color="text.muted">
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
