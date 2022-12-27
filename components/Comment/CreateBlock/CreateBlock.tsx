import React, { useState } from 'react';

import { Grid, Paper, Rating, SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { TextField } from 'components/UI/TextField/TextField';
import { Typography } from 'components/UI/Typography/Typography';

import type { CommentDto } from 'types/dto/comment.dto';
import { IProductGrade } from 'types/entities/IProductGrade';
import { NotificationType } from 'types/entities/Notification';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { dispatchNotification } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import { color } from 'themes';

import translations from './CreateBlock.i18n.json';

import { blockSx } from './CreateBlock.styles';

import StarIcon from '@mui/icons-material/Star';

const initComment: CommentDto = { value: 0, comment: '' };

export type CommentCreateBlockProps = {
  sx?: SxProps;
  onCreate: (comment: CommentDto) => Promise<IProductGrade>;
};

type OnChangeFn = <K extends keyof CommentDto>(name: K, value: CommentDto[K]) => void;

export function CommentCreateBlock({ sx, onCreate }: CommentCreateBlockProps) {
  const { t } = useLocalTranslation(translations);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CommentDto>(initComment);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await onCreate(formData);

      setFormData(initComment);

      const notificationText = formData.comment ? t('notification.withContent') : t('notification.noContent');
      dispatchNotification(notificationText, { title: t('notification.title') });
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    } finally {
      setIsLoading(false);
    }
  };

  const onChange: OnChangeFn = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <Paper sx={{ ...blockSx.container, ...sx }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant='h5' sx={blockSx.title}>
              {t('title')}
            </Typography>

            <Typography sx={{ margin: '10px 0' }} variant='body2'>
              {t('subtitle')}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                name='value'
                onChange={(_, value) => onChange('value', Number(value) || 0)}
                value={formData.value}
                size='large'
                icon={<StarIcon sx={blockSx.star} />}
                emptyIcon={<StarIcon sx={blockSx.emptyStar} />}
              />

              <Typography sx={{ margin: '0 0 0 10px' }} variant='caption' color={color.muted}>
                {t('rate')}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <TextField
              multiline
              rows={3}
              name='comment'
              value={formData.comment}
              label={t('review')}
              onChange={e => onChange('comment', e.target.value)}
            />
            <Button sx={blockSx.btn} type='submit' disabled={!formData.value || isLoading}>
              {isLoading ? t('sending') : t('accept')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
