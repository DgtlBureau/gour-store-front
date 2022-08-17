import React, { ChangeEvent } from 'react';
import { Avatar, Stack } from '@mui/material';

import translations from './AvatarEditor.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { Button } from '../../../UI/Button/Button';
import { Typography } from '../../../UI/Typography/Typography';

import noImage from '../../../../assets/no-image.svg';

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files;
    if (!filesList) return;
    if (!filesList[0]) return;
    onChange(filesList[0]);
  };

  return (
    <Stack sx={{ width: '100%', marginBottom: '30px' }} spacing={1} alignItems="center">
      <Avatar alt="Your profile" src={image || noImage} sx={{ width: 128, height: 128, marginBottom: '30px' }} />

      <div style={sx.btn}>
        <label htmlFor="profile-photo-input" style={sx.label}>
          <Typography variant="body1" color="#fff">
            {t('changePhoto')}
          </Typography>
        </label>
        <input id="profile-photo-input" type="file" onChange={handleChange} style={sx.input} />
      </div>

      <Button sx={sx.btn} variant="outlined" onClick={onRemove}>
        {t('delete')}
      </Button>
    </Stack>
  );
}
