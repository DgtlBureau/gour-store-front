import { Grid } from '@mui/material';
import Image from 'next/image';
import React, { ReactElement } from 'react';
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
    <Grid
      container
      sx={{ position: 'relative' }}
      flexDirection={{ xs: 'column-reverse', md: 'row' }}
      alignItems="center"
      spacing={0}
    >
      <Grid sx={sx.imageContainer} item xs={4} md={6}>
        {!!image && <Image src={image} layout="intrinsic" width={500} height={750} alt="" />}
      </Grid>
      <Grid
        item
        sx={{
          width: '100%',
          maxWidth: {
            xs: 'unset',
            md: '500px',
          },
        }}
        xs={12}
        md={6}
      >
        <Box sx={sx.stepper}>
          <Stepper activeStep={stepIndex} stepsCount={5} percent={100} />
        </Box>
        {children}
      </Grid>
    </Grid>
  );
}
