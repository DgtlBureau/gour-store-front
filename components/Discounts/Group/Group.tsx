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
import { Box } from '../../UI/Box/Box';
import { getCurrencySymbol } from '../../../helpers/currencyHelper';
import { Stepper } from '../../UI/Stepper/Stepper';

type Category = {
  title: string;
  summary: number;
};

type Props = {
  title: string;
  categories: Category[];
};

const sx = {
  title: {
    color: '#321811',
  },
  headerText: {
    color: '#c29f6c',
  },
  container: {
    maxWidth: '1200px',
    backgroundColor: '#fffef7',
    border: '1px solid #f4e7ce',
  },
  summary: {
    color: '#7E5F2F',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  categoryTitle: {
    color: '#7E5F2F',
  },
  category: {
    width: '100%',
    marginBottom: {
      xs: '10px',
      md: '25px',
    },
  },
};

export const DiscountsGroup = ({ title, categories }: Props) => {
  const percents: number[] = [];
  for (let i = 1; i <= 10; i++) {
    percents.push(i);
  }
  return (
    <Accordion sx={sx.container}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={sx.title} variant="h6">
          Прогресс скидки "{title}"
        </Typography>
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
            spacing={{ xs: 1, md: 2 }}
          >
            <Grid item xs={3} md={1}>
              <Typography sx={sx.headerText} variant="subtitle1">
                Скидка %
              </Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent="space-between"
              item
              xs={6}
              md={10}
            >
              {percents.map(percent => (
                <Box
                  key={percent}
                  sx={{
                    width: 'calc(100%/10)',
                    display: 'flex',
                    justifyContent: 'end',
                  }}
                >
                  <Typography
                    sx={{
                      ...sx.headerText,
                      width: '24px',
                      textAlign: 'center',
                    }}
                    variant="subtitle1"
                  >
                    {percent}
                  </Typography>
                </Box>
              ))}
            </Grid>
            <Grid item xs={3} md={1}>
              <Typography
                sx={{ ...sx.headerText, textAlign: 'end' }}
                variant="subtitle1"
              >
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
                <Typography sx={sx.categoryTitle} variant="subtitle2">
                  {category.title}
                </Typography>
              </Grid>
              <Grid item xs={6} md={10}>
                <Stepper
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
