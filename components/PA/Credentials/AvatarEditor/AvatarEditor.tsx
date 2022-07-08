import React, { ChangeEvent } from 'react';
import { Avatar, Stack } from '@mui/material';

import translations from './AvatarEditor.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { Button } from '../../../UI/Button/Button';
import { Typography } from '../../../UI/Typography/Typography';

import noImage from './../../../../assets/no-image.svg';

import s from './AvatarEditor.module.scss';

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

      <div className={s.photoInput}>
        <label htmlFor="profile-photo-input">
          <Typography variant="body1" color="#fff">
            {t('changePhoto')}
          </Typography>
        </label>
        <input id="profile-photo-input" type="file" onChange={handleChange} />
      </div>

      <Button sx={{ minWidth: '165px' }} variant="outlined" onClick={onRemove}>
        {t('delete')}
      </Button>
    </Stack>
  );
}
