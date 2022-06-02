import React, { useState } from 'react';

import { Paper, Grid, Rating } from '@mui/material';

import { Box } from '../UI/Box/Box';
import { Button } from '../UI/Button/Button';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
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
    },
  },
  star: {
    color: theme.palette.accent.main,
  },
  emptyStar: {
    color: theme.palette.text.muted,
  },
  alertTitle:{
    fontWeight: 'Bold'
  }
};

export type CreateCommentBlockProps = {
  onCreate(comment: { value: number; comment: string }): void;
};

export function CreateCommentBlock({ onCreate }: CreateCommentBlockProps) {
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

  const [isAlertOpen,setIsAlert] = useState<boolean>(false);

  const openAlert = () => {
    setIsAlert(true);
  };

  const closeAlert = () => {
    setIsAlert(false);
  };

  const vertical = 'bottom';
  const horizontal = 'right';

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
                name="value"
                onChange={(e, value) => onChange('value', value || 0)}
                value={formData.value}
                size="large"
                icon={<StarIcon sx={sx.star} />}
                emptyIcon={<StarIcon sx={sx.emptyStar} />}
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
              name="comment"
              value={formData.comment}
              onChange={e => onChange('comment', e.target.value)}
            />
            <Button sx={sx.btn} type="submit" disabled={formData.value === 0} onClick={openAlert}>
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
                <AlertTitle sx={sx.alertTitle}>
                  {t('alert.title')}
                </AlertTitle>
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
