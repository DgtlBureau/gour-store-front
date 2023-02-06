import Image from 'next/image';
import React from 'react';

import { ListItem } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { LinkRef as Link } from 'components/UI/Link/Link';

import sx from './Menu.styles';

import instIcon from 'assets/icons/social/inst-white.svg';
import tgIcon from 'assets/icons/social/tg.svg';
import vkIcon from 'assets/icons/social/vk-white.svg';

export type MobileMenuContactsProps = {
  firstPhone: string;
  secondPhone: string;
  email: string;
  tg: string;
  inst: string;
  vk: string;
};

export function MobileMenuContacts({ firstPhone, secondPhone, email, tg, inst, vk }: MobileMenuContactsProps) {
  return (
    <>
      <ListItem sx={sx.phones}>
        <Link href={`tel:${firstPhone}`} sx={sx.link} underline='always'>
          {firstPhone}
        </Link>
        <Link href={`tel:${secondPhone}`} sx={sx.link} underline='always'>
          {secondPhone}
        </Link>
      </ListItem>

      <ListItem sx={sx.socials}>
        <Link href={`mailto:${email}`} sx={sx.link} underline='always'>
          {email}
        </Link>

        <Box sx={sx.socialIcons}>
          <Link href={tg} rel='noreferrer' target='_blank'>
            <Box sx={sx.socialIcon}>
              <Image src={tgIcon} layout='fill' alt='' />
            </Box>
          </Link>

          <Link href={inst} rel='noreferrer' target='_blank'>
            <Box sx={sx.socialIcon}>
              <Image src={instIcon} layout='fill' alt='' />
            </Box>
          </Link>

          <Link href={vk} rel='noreferrer' target='_blank'>
            <Box sx={sx.socialIcon}>
              <Image src={vkIcon} layout='fill' alt='' />
            </Box>
          </Link>
        </Box>
      </ListItem>
    </>
  );
}
