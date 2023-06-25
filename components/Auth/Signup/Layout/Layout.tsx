import React, { ReactElement } from 'react';

import { Grid } from '@mui/material';

type Props = {
  children: ReactElement;
  stepIndex: number;
};

export function SignupLayout({ children, stepIndex }: Props) {
  return (
    <Grid container justifyContent='space-between' alignItems='center' spacing={1}>
      <Grid item xs={2} md={3}/>

      <Grid item xs={10} md={9}>
        {/* <Box sx={sx.stepper}>
          <Stepper activeStep={stepIndex} stepsCount={0} percent={100} />
        </Box> */}
        {children}
      </Grid>

      <Grid item xs={2} md={3}/>
    </Grid>
  );
}
