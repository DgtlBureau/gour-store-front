import React from 'react';
import { useRouter } from 'next/router';

import { AuthLayout } from '../../layouts/Auth/Auth';
import { SigninIntro } from 'components/Auth/Signin/Intro/Intro';
import Image from 'next/image';
import gameImage from './../../assets/images/game/game-mockup.png';
import { Stack } from '@mui/material';
import { AuthCard } from 'components/Auth/Card/Card';
import { Typography } from 'components/UI/Typography/Typography';
import { Box } from '@mui/system';

export default function Auth() {
  const router = useRouter();

  const goToSignIn = () => router.push('/auth/signin');

  const goToSignUp = () => router.push('/auth/signup');

  return (
    <AuthLayout>
      <Stack alignItems="center">
        <div style={{ maxWidth: '500px' }}>
          <SigninIntro onClickAuth={goToSignIn} onClickRegistration={goToSignUp} />
        </div>
        <Box sx={{ margin: '40px 0 0 0', display: { xs: 'none', md: 'block' } }}>
          <Image src={gameImage} width={1000} height={560} alt="" />
        </Box>
        <Box
          sx={{
            margin: '50px 0 0 0',
            display: { xs: 'block', md: 'none' },
            maxWidth: '400px',
            width: 'calc(100% - 40px)',
          }}
        >
          <AuthCard>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Чтобы сыграть в игру, вам необходимо войти в свою учетную запись
            </Typography>
          </AuthCard>
        </Box>
      </Stack>
    </AuthLayout>
  );
}
