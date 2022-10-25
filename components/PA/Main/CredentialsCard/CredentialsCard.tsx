import Image from 'next/image';
import React from 'react';

import { Stack } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { InfoCard } from 'components/UI/Info/Card/Card';
import { Typography } from 'components/UI/Typography/Typography';

import { Path } from 'constants/routes';
import { useLocalTranslation } from 'hooks/useLocalTranslation';

import noPhoto from 'assets/images/default.svg';

import translations from './CredentialsCard.i18n.json';

const sx = {
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photo: {
    height: '92px',
    width: '92px',
    overflow: 'hidden',
    borderRadius: '50%',
  },
};

export type PACredentialsCardProps = {
  name: string;
  phone?: string;
  photo?: string;
  email: string;
};

export function PACredentialsCard({ name, phone, photo, email }: PACredentialsCardProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <InfoCard title={t('title')} footerText={t('footerText')} href={`/${Path.PERSONAL_AREA}/${Path.CREDENTIALS}`}>
      <Box sx={sx.content}>
        <Stack spacing={1}>
          <Box>
            <Typography variant='body2' color='text.muted'>
              {t('name')}
            </Typography>
            <Typography variant='body1'>{name}</Typography>
          </Box>

          {phone && (
            <Box>
              <Typography variant='body2' color='text.muted'>
                {t('phone')}
              </Typography>
              <Typography variant='body1'>{phone}</Typography>
            </Box>
          )}

          <Box>
            <Typography variant='body2' color='text.muted'>
              E-mail
            </Typography>
            <Typography variant='body1'>{email}</Typography>
          </Box>
        </Stack>

        <Box sx={sx.photo}>
          <Image src={photo || noPhoto} objectFit='cover' height={92} width={92} alt='' />
        </Box>
      </Box>
    </InfoCard>
  );
}
