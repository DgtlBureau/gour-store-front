import React from 'react';
import { ListItem } from '@mui/material';
import Image from 'next/image';

import { Box } from '../UI/Box/Box';
import { Link as CustomLink } from '../UI/Link/Link';
import { BlankLink } from '../UI/BlankLink/BlankLink';

import fbIcon from '../../assets/icons/social/fb-white.svg';
import instIcon from '../../assets/icons/social/inst-white.svg';
import vkIcon from '../../assets/icons/social/vk-white.svg';

const sx = {
  phones: {
    padding: '20px',
  },
  socials: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 20px 40px 20px',
  },
  link: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'white',
    '&:first-child': {
      marginRight: '20px',
    },
  },
  socialIcons: {
    display: 'flex',
  },
  socialIcon: {
    position: 'relative',
    height: '38px',
    width: '38px',
    marginLeft: '10px',
  },
};

export type MobileMenuContactsProps = {
  firstPhone: string;
  secondPhone: string;
  email: string;
  fb: string;
  inst: string;
  vk: string;
}

export function MobileMenuContacts({
  firstPhone,
  secondPhone,
  email,
  fb,
  inst,
  vk,
}: MobileMenuContactsProps) {
  return (
    <>
      <ListItem sx={sx.phones}>
        <CustomLink
          path={`tel:${firstPhone}`}
          sx={sx.link}
          underline="always"
        >
          {firstPhone}
        </CustomLink>
        <CustomLink
          path={`tel:${secondPhone}`}
          sx={sx.link}
          underline="always"
        >
          {secondPhone}
        </CustomLink>
      </ListItem>

      <ListItem sx={sx.socials}>
        <CustomLink
          path={`mailto:${email}`}
          sx={sx.link}
          underline="always"
        >
          {email}
        </CustomLink>

        <Box sx={sx.socialIcons}>
          <BlankLink href={fb}>
            <Box sx={sx.socialIcon}>
              <Image src={fbIcon} layout="fill" alt="" />
            </Box>
          </BlankLink>

          <BlankLink href={inst}>
            <Box sx={sx.socialIcon}>
              <Image src={instIcon} layout="fill" alt="" />
            </Box>
          </BlankLink>

          <BlankLink href={vk}>
            <Box sx={sx.socialIcon}>
              <Image src={vkIcon} layout="fill" alt="" />
            </Box>
          </BlankLink>
        </Box>
      </ListItem>
    </>
  );
}
