import Image from 'next/image';
import React, { ChangeEvent } from 'react';

import { Stack } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import noImage from 'assets/no-image.svg';

import translations from './AvatarEditor.i18n.json';

const sx = {
  image: {
    height: '128px',
    width: '128px',
    overflow: 'hidden',
    borderRadius: '50%',
    marginBottom: '30px',
  },
  label: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '6px 16px',
    borderRadius: '4px',
    backgroundColor: '#7e5f2f',
  },
  input: {
    display: 'none',
  },
  btn: {
    minWidth: '165px',
  },
};

export type PACredentialsAvatarEditorProps = {
  image?: string;
  onChange(file: File): void;
  onRemove(): void;
};

export function PACredentialsAvatarEditor({ image, onChange, onRemove }: PACredentialsAvatarEditorProps) {
  const { t } = useLocalTranslation(translations);

  const changeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files;
    if (!filesList) return;
    if (!filesList[0]) return;
    onChange(filesList[0]);
  };

  return (
    <Stack sx={{ width: '100%', marginBottom: '30px' }} spacing={1} alignItems='center'>
      <Box sx={sx.image}>
        <Image src={image || noImage} objectFit='cover' height={128} width={128} alt='' />
      </Box>

      <div style={sx.btn}>
        <label htmlFor='profile-photo-input' style={sx.label}>
          <Typography variant='body1' color='#fff'>
            {t('changePhoto')}
          </Typography>
        </label>
        <input id='profile-photo-input' type='file' onChange={changeAvatar} style={sx.input} />
      </div>

      <Button sx={sx.btn} variant='outlined' onClick={onRemove}>
        {t('delete')}
      </Button>
    </Stack>
  );
}
