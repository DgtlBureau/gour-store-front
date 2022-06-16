import React from 'react';

import translations from './AddressCard.i18n.json';
import { useLocalTranslation } from "../../../hooks/useLocalTranslation";
import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { BaseInformationCard } from '../../UI/BaseInformationCard/BaseInformationCard';

const sx = {
  address: {
    marginBottom: '10px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
};

export type LkMainAddressCardProps = {
  addresses?: {
    title: string;
    address: string;
  }[];
  onClickMore(): void;
};

export function LkMainAddressCard({ addresses, onClickMore }: LkMainAddressCardProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <BaseInformationCard
      title={t('title')}
      footerText={t('footerText')}
      onClickMore={onClickMore}
    >
      {
        addresses ? (
          addresses.map(address => (
            <Box key={address.address} sx={sx.address}>
              <Typography variant="body2" color="text.muted">{address.title}</Typography>
              <Typography variant="body1">{address.address}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1" color="text.muted">
            {t('emptyAddresses')}
          </Typography>
        )
      }
    </BaseInformationCard>
  );
}
