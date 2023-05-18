import Image from 'next/image';
import React, { Fragment } from 'react';

import { Divider, SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { Path } from 'constants/routes';
import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './Footer.i18n.json';

import footerSx from './Footer.styles';

import instIcon from 'assets/icons/social/inst.svg';
import tgIcon from 'assets/icons/social/tg.svg';
import vkIcon from 'assets/icons/social/vk.svg';
import logo from 'assets/images/logo.svg';
import phone from 'assets/icons/social/phone.svg';
import iconMail from 'assets/icons/social/mail.svg';


export type FooterProps = {
  firstPhone: string;
  email: string;
  tg: string;
  inst: string;
  vk: string;
  sx?: SxProps;
};

export function Footer({ firstPhone, email, tg, inst, vk, sx }: FooterProps) {
  const { t } = useLocalTranslation(translations);

  const contacts = [
    {
      label: firstPhone,
      path: `tel:${firstPhone}`,
      icon: phone,
    },
    {
      label: email,
      path: `mailto:${email}`,
      icon: iconMail,
    },
    {
      label: tg,
      path: `${tg}`,
      icon: tgIcon,
    },
  ];

  const social = [
    {
      icon: tgIcon,
      path: tg,
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
      label: t('terms'),
      path: `/${Path.OFERTA}`,
    },
    {
      label: t('contacts'),
      path: `/${Path.CONTACTS}`,
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

              <Box key={link.path} sx={footerSx.card}>
                <Link sx={footerSx.card.textLink} href={link.path} target="_blank" underline='none'>
                  <Box sx={footerSx.card.icon}>
                    <Image src={link.icon} height={21} width={21} alt='' />
                  </Box>
                  <Typography sx={footerSx.card.textLabel}>
                    {link.label}
                </Typography>
                </Link>
              </Box>
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
        <Typography sx={footerSx.infoLink}>{t('copyright')}</Typography>

        {info.map(link => (
          <Fragment key={link.path}>
            <Divider sx={footerSx.divider} orientation='vertical' variant='middle' flexItem />
            <Link href={link.path} rel='noreferrer' sx={footerSx.infoLink}>
              {link.label}
            </Link>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
}
