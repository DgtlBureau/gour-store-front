import React from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '../../UI/Typography/Typography';
import { Item } from '../Item/Item';
import { Box } from '../../UI/Box/Box';
import { getCurrencySymbol } from '../../../helpers/currencyHelper';

type Category = {
  title: string;
  summary: number;
};

type Props = {
  title: string;
  categories: Category[];
};

const percents: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sx = {
  summary: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  category: {
    width: '100%',
    marginBottom: {
      xs: '10px',
      md: '25px',
    },
  },
};

export const Group = ({ title, categories }: Props) => {
  return (
    <Accordion sx={{ maxWidth: '1200px' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body1">Прогресс скидки "{title}"</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack>
          <Grid
            sx={{
              margin: '0 0 25px 0',
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
            container
            spacing={2}
          >
            <Grid item xs={2} md={1}>
              <Typography variant="subtitle1">Скидка %</Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent="space-between"
              item
              xs={8}
              md={10}
            >
              {percents.map(percent => (
                <Box
                  sx={{
                    width: 'calc(100%/10)',
                    display: 'flex',
                    justifyContent: 'end',
                  }}
                >
                  <Typography
                    sx={{ width: '24px', textAlign: 'center' }}
                    variant="subtitle1"
                  >
                    {percent}
                  </Typography>
                </Box>
              ))}
            </Grid>
            <Grid item xs={2} md={1}>
              <Typography variant="subtitle1">
                Всего {getCurrencySymbol('cheeseCoin')}
              </Typography>
            </Grid>
          </Grid>
          {categories.map(category => (
            <Grid
              sx={sx.category}
              key={category.summary}
              container
              spacing={{ xs: 1, md: 2 }}
            >
              <Grid item xs={3} md={1}>
                <Typography variant="subtitle2">{category.title}</Typography>
              </Grid>
              <Grid item xs={6} md={10}>
                <Item
                  stepsCount={10}
                  percent={(category.summary % 100000) / 1000}
                  activeStep={Math.floor(category.summary / 100000)}
                />
              </Grid>
              <Grid item xs={3} md={1} sx={sx.summary}>
                <Typography variant="subtitle2">{category.summary}</Typography>
              </Grid>
            </Grid>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
