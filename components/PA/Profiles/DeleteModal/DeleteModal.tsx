import React from 'react';

import translations from './DeleteModal.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { Modal } from '../../../UI/Modal/Modal';

export type PAProfilesDeleteModalProps = {
  isOpen: boolean;
  onAccept(): void;
  onClose(): void;
};

export function PAProfilesDeleteModal({ isOpen, onAccept, onClose }: PAProfilesDeleteModalProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <Modal isOpen={isOpen} title={t('title')} description={t('description')} onAccept={onAccept} onClose={onClose} />
  );
}
