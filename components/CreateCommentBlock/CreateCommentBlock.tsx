import React, { useState } from 'react';

import { Paper, Grid, Rating } from '@mui/material';

import { Box } from '../UI/Box/Box';
import { Button } from '../UI/Button/Button';
import { Textarea } from '../UI/Textarea/Textarea';
import { Typography } from '../UI/Typography/Typography';
import { defaultTheme as theme } from '../../themes';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import translations from './CreateCommentBlock.i18n.json';

import StarIcon from '@mui/icons-material/Star';

const sx = {
  block: {
    padding: '20px',
  },
  btn: {
    margin: '15px 0 0 0',
    width: {
      md: '40%',
      sm: '100%',
    }
  },
  star: {
    color: theme.palette.accent.main,
  },
  emptyStar: {
    color: theme.palette.text.muted,
  },
};

export type CreateCommentBlockProps = {
  onCreate(comment: { grade: number; text: string }): void;
};

export function CreateCommentBlock({ onCreate }: CreateCommentBlockProps) {
  const { t } = useLocalTranslation(translations);

  const [formData, setFormData] = useState<{ grade: number; text: string }>({
    grade: 0,
    text: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.grade !== 0) onCreate(formData);
  };

  const onChange = (name: string, value: string | number) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <Paper sx={sx.block}>
      <form onSubmit={e => handleSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography 
              variant="h5" 
              sx={{ fontFamily: 'Roboto slab', fontWeight: 'bold' }}
            >
              {t('title')}
            </Typography>

            <Typography sx={{ margin: '10px 0' }} variant="body1">
              {t('subtitle')}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                name="grade"
                value={formData.grade}
                size="large"
                icon={<StarIcon sx={sx.star} />}
                emptyIcon={<StarIcon sx={sx.emptyStar} />}
                onChange={(e, value) => onChange('grade', value || 0)}
              />

              <Typography
                sx={{ margin: '0 0 0 10px' }}
                variant="caption"
                color={theme.palette.text.muted}
              >
                {t('rate')}
              </Typography>
            </Box>
          </Grid>
          
          <Grid
            item
            xs={8}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Textarea
              name="text"
              placeholder={t('placeholder')}
              onChange={e => onChange('text', e.target.value)}
            />
            <Button
              sx={sx.btn}
              type="submit"
              disabled={formData.grade === 0}
            >
              {t('accept')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
