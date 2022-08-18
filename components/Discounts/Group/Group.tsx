import React from 'react';
import { Grid } from '@mui/material';

import { Accordion, AccordionDetails, AccordionSummary } from 'components/UI/Accordion/Accordion';
import { Typography } from 'components/UI/Typography/Typography';
import { Box } from 'components/UI/Box/Box';
import { getCurrencySymbol } from 'helpers/currencyHelper';
import { Stepper } from 'components/UI/Stepper/Stepper';

type Category = {
  title: string;
  summary: number;
};

type Props = {
  title: string;
  categories: Category[];
};

const sx = {
  headerText: {
    color: 'text.muted',
  },
  categoryTitle: {
    color: 'text.secondary',
  },
  category: {
    width: '100%',
    marginBottom: {
      xs: '10px',
      md: '25px',
    },
  },
};

export function DiscountsGroup({ title, categories }: Props) {
  const percents: number[] = [];
  for (let i = 1; i <= 10; i++) {
    percents.push(i);
  }
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant='h6'>{`Прогресс скидки "${title}"`}</Typography>
      </AccordionSummary>

      <AccordionDetails>
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
            <Typography sx={sx.headerText} variant='subtitle1'>
              Скидка %
            </Typography>
          </Grid>

          <Grid display='flex' justifyContent='space-between' item xs={6} md={10}>
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
                  variant='subtitle1'
                >
                  {percent}
                </Typography>
              </Box>
            ))}
          </Grid>

          <Grid item xs={3} md={1}>
            <Typography sx={{ ...sx.headerText, textAlign: 'end' }} variant='subtitle1'>
              Всего {getCurrencySymbol('cheeseCoin')}
            </Typography>
          </Grid>
        </Grid>

        {categories.map(category => (
          <Grid sx={sx.category} key={category.summary} container spacing={{ xs: 1, md: 2 }}>
            <Grid item xs={3} md={1}>
              <Typography sx={sx.categoryTitle} variant='subtitle2'>
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

            <Grid item xs={3} md={1}>
              <Typography variant='subtitle2'>{category.summary}</Typography>
            </Grid>
          </Grid>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
