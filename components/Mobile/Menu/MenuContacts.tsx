import React from 'react';
import { ListItem } from '@mui/material';
import Image from 'next/image';

import { Box } from '../../UI/Box/Box';
import Link from '../../UI/Link/Link';

import fbIcon from '../../../assets/icons/social/fb-white.svg';
import instIcon from '../../../assets/icons/social/inst-white.svg';
import vkIcon from '../../../assets/icons/social/vk-white.svg';

import sx from './Menu.styles';

export type MobileMenuContactsProps = {
  firstPhone: string;
  secondPhone: string;
  email: string;
  fb: string;
  inst: string;
  vk: string;
};

export function MobileMenuContacts({ firstPhone, secondPhone, email, fb, inst, vk }: MobileMenuContactsProps) {
  return (
    <>
      <ListItem sx={sx.phones}>
        <Link href={`tel:${firstPhone}`} sx={sx.link} underline="always">
          {firstPhone}
        </Link>
        <Link href={`tel:${secondPhone}`} sx={sx.link} underline="always">
          {secondPhone}
        </Link>
      </ListItem>

      <ListItem sx={sx.socials}>
        <Link href={`mailto:${email}`} sx={sx.link} underline="always">
          {email}
        </Link>

        <Box sx={sx.socialIcons}>
          <Link href={fb} rel="noreferrer" target="_blank">
            <Box sx={sx.socialIcon}>
              <Image src={fbIcon} layout="fill" alt="" />
            </Box>
          </Link>

          <Link href={inst} rel="noreferrer" target="_blank">
            <Box sx={sx.socialIcon}>
              <Image src={instIcon} layout="fill" alt="" />
            </Box>
          </Link>

          <Link href={vk} rel="noreferrer" target="_blank">
            <Box sx={sx.socialIcon}>
              <Image src={vkIcon} layout="fill" alt="" />
            </Box>
          </Link>
        </Box>
      </ListItem>
    </>
  );
}
