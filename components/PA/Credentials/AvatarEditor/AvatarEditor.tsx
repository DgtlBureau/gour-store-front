import React, { ChangeEvent } from 'react';
import { Avatar, Stack } from '@mui/material';

import translations from './AvatarEditor.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { Button } from '../../../UI/Button/Button';
import { Typography } from '../../../UI/Typography/Typography';

import s from './AvatarEditor.module.scss';

export type PACredentialsAvatarEditorProps = {
  image: string;
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
    <Stack sx={{ width: '165px' }} spacing={2} alignItems="center">
      <Avatar alt="Your profile" src={image} sx={{ width: 128, height: 128 }} />
      <div className={s.photoInput}>
        <label htmlFor="profile-photo-input">
          <Typography variant="body1" color="#fff">
            {t('changePhoto')}
          </Typography>
        </label>
        <input id="profile-photo-input" type="file" onChange={handleChange} />
      </div>
      <Button sx={{ width: '100%' }} variant="outlined" onClick={onRemove}>
        {t('delete')}
      </Button>
    </Stack>
  );
}
