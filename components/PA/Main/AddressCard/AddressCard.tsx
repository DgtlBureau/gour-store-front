import React from 'react';

import { Path } from 'constants/routes';

import PALoader from 'components/PA/Main/Loader';
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
  addresses: {
    title: string;
    address: string;
  }[];
  isLoading: boolean;
};

export function PAAddressCard({ addresses, isLoading }: PAAddressCardProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <InfoCard title={t('title')} footerText={t('footerText')} href={`/${Path.PERSONAL_AREA}/${Path.ADDRESSES}`}>
      {isLoading && <PALoader />}

      {!isLoading &&
        addresses.map(address => (
          <Box key={address.address} sx={sx.address}>
            <Typography variant='body2' color='text.muted'>
              {address.title}
            </Typography>
            <Typography variant='body1'>{address.address}</Typography>
          </Box>
        ))}

      {!isLoading && !addresses.length && (
        <Typography variant='body1' color='text.muted'>
          {t('emptyAddresses')}
        </Typography>
      )}
    </InfoCard>
  );
}
