import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { InfoCard } from 'components/UI/Info/Card/Card';
import { Typography } from 'components/UI/Typography/Typography';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './AddressCard.i18n.json';

const sx = {
  address: {
    marginBottom: '10px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
};

export type PAAddressCardProps = {
  addresses?: {
    title: string;
    address: string;
  }[];
  onClickMore(): void;
};

export function PAAddressCard({ addresses, onClickMore }: PAAddressCardProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <InfoCard title={t('title')} footerText={t('footerText')} onClickMore={onClickMore}>
      {addresses && addresses.length !== 0 ? (
        addresses.map(address => (
          <Box key={address.address} sx={sx.address}>
            <Typography variant='body2' color='text.muted'>
              {address.title}
            </Typography>
            <Typography variant='body1'>{address.address}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant='body1' color='text.muted'>
          {t('emptyAddresses')}
        </Typography>
      )}
    </InfoCard>
  );
}
