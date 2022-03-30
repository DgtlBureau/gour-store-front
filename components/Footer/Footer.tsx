import React, { Fragment } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { Divider } from '@mui/material';

import { Link as CustomLink } from '../UI/Link/Link';
import { Box } from '../UI/Box/Box';

import logo from '../../assets/images/logo.svg';
import fbIcon from '../../assets/icons/social/fb.svg';
import instIcon from '../../assets/icons/social/inst.svg';
import vkIcon from '../../assets/icons/social/vk.svg';

import sx from './Footer.styles';

const links = {
  contacts: [
    {
      label: '+7 812 602-52-61',
      path: 'tel:+78126025261',
    },
    {
      label: '+372 880-45-21',
      path: 'tel:+3728804521',
    },
    {
      label: 'rk@gour-food.com',
      path: 'mailto:rk@gour-food.com',
    },
  ],
  social: [
    {
      icon: fbIcon,
      path: 'https://www.facebook.com/',
    },
    {
      icon: instIcon,
      path: 'https://www.instagram.com/',
    },
    {
      icon: vkIcon,
      path: 'https://vk.com/',
    },
  ],
  info: [
    {
      label: '© GOUR FOOD, 2022г.',
      path: 'https://gour-food.com/',
    },
    {
      label: 'Правила покупки и возврата',
      path: 'https://gour-food.com/',
    },
    {
      label: 'Политика конфиденциальности',
      path: 'https://gour-food.com/',
    },
    {
      label: 'Соглашение об использовании cookie-файлов',
      path: 'https://gour-food.com/',
    },
    {
      label: 'Условия и соглашения для физических лиц',
      path: 'https://gour-food.com/',
    },
  ],
};

export function Footer() {
  return (
    <Box>
      <Box sx={sx.contactsWrapper}>
        <CustomLink path="/">
          <Box sx={sx.logo}>
            <Image src={logo} height={150} width={125} alt="" />
          </Box>
        </CustomLink>

        <Box sx={sx.contacts}>
          {links.contacts.map(link => (
            <CustomLink
              key={link.path}
              path={link.path}
              underline="none"
              sx={sx.contactsLink}
            >
              {link.label}
            </CustomLink>
          ))}
          <Box sx={sx.social}>
            {links.social.map(link => (
              <a
                key={link.path}
                href={link.path}
                rel="noreferrer"
                target="_blank"
                style={sx.socialLink}
              >
                <Image src={link.icon} height={38} width={38} alt="" />
              </a>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={sx.info}>
        {links.info.map((link, i) => (
          <Fragment key={link.path}>
            <NextLink href={link.path} passHref>
              <a href="replace" rel="noreferrer" target="_blank" style={sx.infoLink}>
                {link.label}
              </a>
            </NextLink>
            {i + 1 !== links.info.length && (
              <Divider sx={sx.divider} orientation="vertical" variant="middle" flexItem />
            )}
          </Fragment>
        ))}
      </Box>
    </Box>
  );
}
