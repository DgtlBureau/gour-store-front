import React from 'react';

import { Modal } from 'components/UI/Modal/Modal';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './DeleteModal.i18n.json';

export type PAProfilesDeleteModalProps = {
  isOpen: boolean;
  onAccept(): void;
  onClose(): void;
};

export function PAProfilesDeleteModal({ isOpen, onAccept, onClose }: PAProfilesDeleteModalProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <Modal
      isOpen={isOpen}
      title={t('title')}
      description={t('description')}
      showRefuseButton
      onAccept={onAccept}
      onClose={onClose}
    />
  );
}
