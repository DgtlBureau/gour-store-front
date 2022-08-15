import React, { useState } from 'react';
import { Alert, AlertTitle, Snackbar, Paper, Grid, Rating, SxProps, AlertColor } from '@mui/material';

import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CancelIcon from '@mui/icons-material/CancelOutlined';

import type { CommentDto } from '../../../@types/dto/comment.dto';
import { IProductGrade } from '../../../@types/entities/IProductGrade';
import translations from './CreateBlock.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Box } from '../../UI/Box/Box';
import { Button } from '../../UI/Button/Button';
import { Typography } from '../../UI/Typography/Typography';
import { TextField } from '../../UI/TextField/TextField';
import { defaultTheme as theme } from '../../../themes';

const blockSx = {
  title: {
    fontSize: {
      sm: '24px',
      xs: '16px',
    },
    color: 'text.primary',
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
  },
  container: {
    padding: '20px',
    boxShadow: 'none',
  },
  btn: {
    margin: '15px 0 0 0',
    width: '100%',
    maxWidth: {
      md: '300px',
      xs: '100%',
    },
  },
  star: {
    color: theme.palette.accent.main,
  },
  emptyStar: {
    color: theme.palette.text.muted,
  },
  alertWrapper: {
    whiteSpace: 'pre-wrap',
  },
  alertTitle: {
    fontWeight: 'Bold',
  },
};

const initComment: CommentDto = { value: 0, comment: '' };

export type CommentCreateBlockProps = {
  sx?: SxProps;
  onCreate: (comment: CommentDto) => Promise<IProductGrade>;
};

type OnChangeFn = <K extends keyof CommentDto>(name: K, value: CommentDto[K]) => void;

export function CommentCreateBlock({ sx, onCreate }: CommentCreateBlockProps) {
  const { t } = useLocalTranslation(translations);

  const [alertOptions, setAlertOptions] = useState({ isOpen: false, isPositive: false });
  const [formData, setFormData] = useState<CommentDto>(initComment);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await onCreate(formData);
      setFormData(initComment);
      openAlert(true);
    } catch {
      openAlert(false);
    }
  };

  const onChange: OnChangeFn = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const openAlert = (isPositive: boolean) => setAlertOptions({ isOpen: true, isPositive });
  const closeAlert = () => setAlertOptions({ ...alertOptions, isOpen: false });

  const vertical = 'bottom';
  const horizontal = 'right';

  const alertMessage = (() => {
    const potitive = alertOptions.isPositive ? 'positive' : 'negative';
    const severity: AlertColor = alertOptions.isPositive ? 'success' : 'error';
``
    return {
      title: t(`alert.${potitive}.title`),
      message: t(`alert.${potitive}.message`),
      severity,
    };
  })();

  const AlertIcon = alertOptions.isPositive ? CheckIcon : CancelIcon;

  return (
    <Paper sx={{ ...blockSx.container, ...sx }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={blockSx.title}>
              {t('title')}
            </Typography>

            <Typography sx={{ margin: '10px 0' }} variant="body2">
              {t('subtitle')}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                name="value"
                onChange={(_, value) => onChange('value', Number(value) || 0)}
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
              name="comment"
              value={formData.comment}
              label={t('review')}
              onChange={e => onChange('comment', e.target.value)}
            />
            <Button sx={blockSx.btn} type="submit" disabled={!formData.value}>
              {t('accept')}
            </Button>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={alertOptions.isOpen}
              autoHideDuration={6000}
              onClose={closeAlert}
              message="sda"
            >
              <Alert icon={<AlertIcon fontSize="inherit" />} severity={alertMessage.severity} sx={blockSx.alertWrapper}>
                <AlertTitle sx={blockSx.alertTitle}>{alertMessage.title}</AlertTitle>
                {alertMessage.message}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
