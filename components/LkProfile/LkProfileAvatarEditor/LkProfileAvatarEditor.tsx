import React from 'react';
import s from './LkProfileAvatarEditor.module.scss';
import translations from './LkProfileAvatarEditor.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Avatar, Stack } from '@mui/material';
import { Button } from '../../UI/Button/Button';

export type LkProfileAvatarEditorProps = {
  image: string;
  onChange(): void;
  onClose(): void;
};

export function LkProfileAvatarEditor({
  image,
  onChange,
  onClose,
}: LkProfileAvatarEditorProps) {
  const { t } = useLocalTranslation(translations);
  return (
    <Stack spacing={2} alignItems="center">
      <Avatar alt="Your profile" src={image} sx={{ width: 128, height: 128 }} />
      <Button onClick={onChange}>Изменить фото</Button>
      <Button variant="outlined" onClick={onClose}>
        Удалить
      </Button>
    </Stack>
  );
}
