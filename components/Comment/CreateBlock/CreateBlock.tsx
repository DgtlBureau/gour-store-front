import React, { useState } from 'react';
import { Alert, AlertTitle, Snackbar, Paper, Grid, Rating, SxProps } from '@mui/material';

import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

import translations from './CreateBlock.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Box } from '../../UI/Box/Box';
import { Button } from '../../UI/Button/Button';
import { Typography } from '../../UI/Typography/Typography';
import { TextField } from '../../UI/TextField/TextField';
import { defaultTheme as theme } from '../../../themes';

const blockSx = {
  title: {
    color: 'text.primary',
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
  },
  container: {
    padding: '20px',
  },
  btn: {
    margin: '15px 0 0 0',
    width: {
      md: '40%',
      sm: '100%',
    },
  },
  star: {
    color: theme.palette.accent.main,
  },
  emptyStar: {
    color: theme.palette.text.muted,
  },
  alertTitle: {
    fontWeight: 'Bold',
  },
};

export type CommentCreateBlockProps = {
  sx?: SxProps;
  onCreate(comment: { value: number; comment: string }): void;
};

export function CommentCreateBlock({ sx, onCreate }: CommentCreateBlockProps) {
  const { t } = useLocalTranslation(translations);

  const [formData, setFormData] = useState<{ value: number; comment: string }>({
    value: 0,
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ value: 0, comment: '' });
    if (formData.value !== 0) onCreate(formData);
  };

  const onChange = (name: string, value: string | number) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const [isAlertOpen, setIsAlert] = useState<boolean>(false);

  const openAlert = () => {
    setIsAlert(true);
  };

  const closeAlert = () => {
    setIsAlert(false);
  };

  const vertical = 'bottom';
  const horizontal = 'right';

  return (
    <Paper sx={{ ...blockSx.container, ...sx }}>
      <form onSubmit={e => handleSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h5" sx={blockSx.title}>
              {t('title')}
            </Typography>

            <Typography sx={{ margin: '10px 0' }} variant="body1">
              {t('subtitle')}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                name="value"
                onChange={(e, value) => onChange('value', value || 0)}
                value={formData.value}
                size="large"
                icon={<StarIcon sx={blockSx.star} />}
                emptyIcon={<StarIcon sx={blockSx.emptyStar} />}
              />

              <Typography sx={{ margin: '0 0 0 10px' }} variant="caption" color={theme.palette.text.muted}>
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
            <TextField
              multiline
              rows={3}
              name="comment"
              value={formData.comment}
              onChange={e => onChange('comment', e.target.value)}
            />
            <Button sx={blockSx.btn} type="submit" disabled={formData.value === 0} onClick={openAlert}>
              {t('accept')}
            </Button>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={isAlertOpen}
              autoHideDuration={6000}
              onClose={closeAlert}
              message="sda"
            >
              <Alert icon={<CheckCircleOutlineRoundedIcon fontSize="inherit" />} severity="success">
                <AlertTitle sx={blockSx.alertTitle}>{t('alert.title')}</AlertTitle>
                {t('alert.message.1')}
                <br></br>
                {t('alert.message.2')}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
