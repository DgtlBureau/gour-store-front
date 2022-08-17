import React, { Fragment } from 'react';
import Image from 'next/image';
import { Divider, SxProps } from '@mui/material';

import { Typography } from 'components/UI/Typography/Typography'
import { Path } from 'constants/routes'
import translations from './Footer.i18n.json';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import { LinkRef as Link } from '../UI/Link/Link';
import { Box } from '../UI/Box/Box';

import logo from '../../assets/images/logo.svg';
import fbIcon from '../../assets/icons/social/fb.svg';
import instIcon from '../../assets/icons/social/inst.svg';
import vkIcon from '../../assets/icons/social/vk.svg';

import footerSx from './Footer.styles';

export type FooterProps = {
  firstPhone: string;
  email: string;
  fb: string;
  inst: string;
  vk: string;
  sx?: SxProps;
};

export function Footer({
  firstPhone,
  email,
  fb,
  inst,
  vk,
  sx,
}: FooterProps) {
  const { t } = useLocalTranslation(translations);

  const contacts = [
    {
      label: firstPhone,
      path: `tel:${firstPhone}`,
    },
    {
      label: email,
      path: `mailto:${email}`,
    },
  ];

  const social = [
    {
      icon: fbIcon,
      path: fb,
    },
    {
      icon: instIcon,
      path: inst,
    },
    {
      icon: vkIcon,
      path: vk,
    },
  ];

  const info = [
    {
      label: t('rules'),
      path: `/${Path.RULES}`,
    },
    {
      label: t('privacy'),
      path: `/${Path.PRIVACY}`,
    },
    {
      label: t('cookie'),
      path: `/${Path.COOKIE}`,
    },
    {
      label: t('terms'),
      path: `/${Path.OFERTA}`,
    },
  ];

  return (
    <Box sx={{ ...sx, maxWidth: '1200px' }}>
      <Box sx={footerSx.contactsWrapper}>
        <Link href='/'>
          <Box sx={footerSx.logo}>
            <Image src={logo} height={150} width={125} alt='' />
          </Box>
        </Link>

        <Box sx={footerSx.contacts}>
          {contacts.map(link => (
            <Link key={link.path} href={link.path} underline='none' sx={footerSx.contactsLink}>
              {link.label}
            </Link>
          ))}

          <Box sx={footerSx.social}>
            {social.map(link => (
              <Link key={link.path} href={link.path} rel='noreferrer' target='_blank' sx={footerSx.socialLink}>
                <Image src={link.icon} height={38} width={38} alt='' />
              </Link>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={footerSx.info}>
        <Typography sx={footerSx.infoLink}>
          {t('copyright')}
        </Typography>

        {info.map((link) => (
          <Fragment key={link.path}>
            <Divider
              sx={footerSx.divider}
              orientation="vertical"
              variant="middle"
              flexItem
            />
            <Link
              href={link.path}
              rel="noreferrer"
              target="_blank"
              sx={footerSx.infoLink}
            >
              {link.label}
            </Link>
          </Fragment>
        ))} 
      </Box>
    </Box>
  );
}
