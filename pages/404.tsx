import React from 'react';
import Image from 'next/image';

import { useAppNavigation } from 'components/Navigation';
import { PrivateLayout } from 'layouts/Private/Private';
import translations from './Main.i18n.json';
import { useLocalTranslation } from '../hooks/useLocalTranslation';
import { ShopLayout } from '../layouts/Shop/Shop';
import { Box } from '../components/UI/Box/Box';
import { Button } from '../components/UI/Button/Button';
import { Typography } from '../components/UI/Typography/Typography';
import { LinkRef as Link } from '../components/UI/Link/Link';

import notFound from '../assets/images/404.png';

const sx = {
  notFound: {
    marginTop: {
      md: '140px',
      xs: '80px',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: {
      xs: '0 10px',
      sm: '0 20px',
    },
  },
  title: {
    fontSize: {
      sm: '40px',
      xs: '24px',
    },
    fontWeight: 'bold',
    color: 'text.secondary',
    marginTop: '55px',
  },
  button: {
    width: {
      xs: '100%',
      sm: 'fit-content',
    },
    margin: '45px 0',
  },
};

export default function NotFound() {
  const { goToHome } = useAppNavigation();
  const { t } = useLocalTranslation(translations);

  return (
    <PrivateLayout>
      <ShopLayout currency='cheeseCoin' language='ru'>
        <Box sx={sx.notFound}>
          <Link href='/'>
            <Image src={notFound} height='325' width='814' alt='notFound' />
          </Link>

          <Typography variant='h4' sx={sx.title}>
            {t('notFound.message')}
          </Typography>

          <Button sx={sx.button} onClick={goToHome}>
            {t('notFound.button')}
          </Button>
        </Box>
      </ShopLayout>
    </PrivateLayout>
  );
}
