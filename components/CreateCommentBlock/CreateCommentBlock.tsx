import React, { CSSProperties, useState } from 'react';

import { Grid, Rating } from '@mui/material';
import { Box } from '../UI/Box/Box';
import { Button } from '../UI/Button/Button';
import { Textarea } from '../UI/Textarea/Textarea';
import { Typography } from '../UI/Typography/Typography';

export type CreateCommentBlockProps = {
  onCreate(comment: { value: number; comment: string }): void;
};

export function CreateCommentBlock({ onCreate }: CreateCommentBlockProps) {
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

  const containerBoxSx: CSSProperties = {
    background: '#EBEBEB',
    borderRadius: '6px',
    padding: '20px',
  };

  const textareaSx: CSSProperties = {
    width: '100%',
    border: '1px solid rgba(0, 0, 0, 0.42)',
    boxSizing: 'border-box',
    borderRadius: '4px',
    minHeight: '93px',
    padding: '8px 12px',
    background: 'transparent',
  };

  return (
    <Box sx={containerBoxSx}>
      <form onSubmit={e => handleSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6">Вы уже покупали этот товар? </Typography>
            <Typography sx={{ margin: '10px 0' }} variant="body1">
              Оставьте отзыв
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                name="value"
                onChange={(e, value) => onChange('value', value || 0)}
                value={formData.value}
                size="large"
              />
              <Typography sx={{ margin: '0 0 0 10px' }} variant="caption">
                Оцените товар
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
              sx={textareaSx}
              name="comment"
              value={formData.comment}
              onChange={e => onChange('comment', e.target.value)}
            />
            <Button
              sx={{ margin: '15px 0 0 0' }}
              type="submit"
              disabled={formData.value === 0}
            >
              Оставить отзыв
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
