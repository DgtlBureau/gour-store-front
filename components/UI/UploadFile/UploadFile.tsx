import React, { ChangeEventHandler } from 'react';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Button } from '../Button/Button';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import translations from './UploadFile.i18n.json';

type Props = {
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  allowedFileTypes: 'application/pdf'[];
};

export function UploadFile({ id, allowedFileTypes, onChange }: Props) {
  const { t } = useLocalTranslation(translations);

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      <label htmlFor={id}>
        <Input accept={allowedFileTypes.join(',')} onChange={onChange} id={id} multiple type='file' />
        <Button variant='contained' component='span'>
          {t('upload')}
        </Button>
      </label>
    </Stack>
  );
}
