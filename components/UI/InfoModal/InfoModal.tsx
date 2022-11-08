import Image from 'next/image';
import React, { ReactNode } from 'react';

import { Box } from 'components/UI/Box/Box';
import { Modal } from 'components/UI/Modal/Modal';
import { Typography } from 'components/UI/Typography/Typography';

import sx from './InfoModal.styles';

import failureIcon from 'assets/icons/general/failure.svg';
import successIcon from 'assets/icons/general/success.svg';

export type InfoModalStatus = 'success' | 'failure';

const imgByStatus: Record<InfoModalStatus, string> = {
  success: successIcon,
  failure: failureIcon,
};

export type InfoModalProps = {
  isOpen: boolean;
  title: string;
  content: ReactNode;
  status?: InfoModalStatus;
  onClose: () => void;
};

export function InfoModal({ isOpen, title, content, status, onClose }: InfoModalProps) {
  const imgSrc = status && imgByStatus[status];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title=''>
      <Box sx={sx.container}>
        <Image src={imgSrc} layout='fixed' width={70} height={70} />
        <Typography color='text.secondary' sx={sx.title} variant='body1'>
          {title}
        </Typography>
        {content}
      </Box>
    </Modal>
  );
}
