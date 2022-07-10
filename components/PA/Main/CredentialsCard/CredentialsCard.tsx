import React from 'react';
import Image from 'next/image';

import translations from './CredentialsCard.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { InfoCard } from '../../../UI/Info/Card/Card';
import { Box } from '../../../UI/Box/Box';
import { Typography } from '../../../UI/Typography/Typography';

import noPhoto from './../../../../assets/no-image.svg';

const sx = {
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    marginBottom: '10px',
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
  phone: string;
  photo?: string;
  onClickMore(): void;
};

export function PACredentialsCard({ name, phone, photo, onClickMore }: PACredentialsCardProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <InfoCard title={t('title')} footerText={t('footerText')} onClickMore={onClickMore}>
      <Box sx={sx.content}>
        <Box>
          <Box sx={sx.name}>
            <Typography variant="body2" color="text.muted">
              {t('name')}
            </Typography>
            <Typography variant="body1">{name}</Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.muted">
              {t('phone')}
            </Typography>
            <Typography variant="body1">{phone}</Typography>
          </Box>
        </Box>

        <Box sx={sx.photo}>
          <Image src={photo || noPhoto} objectFit="cover" height={92} width={92} alt="" />
        </Box>
      </Box>
    </InfoCard>
  );
}
