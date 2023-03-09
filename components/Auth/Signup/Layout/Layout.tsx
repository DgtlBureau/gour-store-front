import Image from 'next/image';
import React, { ReactElement } from 'react';

import { Grid } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Stepper } from 'components/UI/Stepper/Stepper';

import { sx } from './Layout.styles';

type Props = {
  children: ReactElement;
  image: string;
  stepIndex: number;
};

export function SignupLayout({ children, image, stepIndex }: Props) {
  return (
    <Grid container alignItems='center' spacing={1}>
      <Grid sx={sx.image} item xs={4} md={6}>
        <Image src={image} layout='fill' alt='' />
      </Grid>

      <Grid item xs={12} md={6}>
        <Box sx={sx.stepper}>
          <Stepper activeStep={stepIndex} stepsCount={4} percent={100} />
        </Box>
        {children}
      </Grid>
    </Grid>
  );
}
