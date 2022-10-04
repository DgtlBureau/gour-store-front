import React from 'react';
import { Grid } from '@mui/material';

import { ICategoryWithDiscount } from 'types/entities/ICategory';
import { Language } from 'types/entities/Language';

import { Accordion, AccordionDetails, AccordionSummary } from 'components/UI/Accordion/Accordion';
import { Typography } from 'components/UI/Typography/Typography';
import { Box } from 'components/UI/Box/Box';
import { Stepper } from 'components/UI/Stepper/Stepper';
import { getCurrencySymbol } from 'helpers/currencyHelper';

import { sx } from './Group.styles';

type Props = {
  title: string;
  subCategories: ICategoryWithDiscount['subCategories'];
  language: Language;
};

export function DiscountsGroup({ title, subCategories, language }: Props) {
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

          <Grid display='flex' sx={sx.percentBlock} justifyContent='space-between' item xs={6} md={9}>
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

        {subCategories.map(subCategory => (
          <Grid sx={sx.category} key={subCategory.id} container spacing={{ xs: 1, md: 2 }}>
            <Grid item xs={3} md={2}>
              <Typography sx={sx.categoryTitle} variant='subtitle2'>
                {subCategory.title[language]}
              </Typography>
            </Grid>

            <Grid item xs={6} md={9}>
              <Stepper
                stepsCount={10}
                percent={(subCategory.discountPrice % 100000) / 1000}
                activeStep={Math.floor(subCategory.discountPrice / 100000)}
              />
            </Grid>

            <Grid item xs={3} md={1}>
              <Typography variant='subtitle2'>{subCategory.discountPrice}</Typography>
            </Grid>
          </Grid>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
