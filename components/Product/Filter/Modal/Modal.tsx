import React from 'react';

import { Modal } from 'components/UI/Modal/Modal';

import { ICategory } from 'types/entities/ICategory';
import { IFilters, OrderType } from 'types/entities/IProduct';
import { Language } from 'types/entities/Language';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import { ProductFilterList } from '../List/List';
import translations from './Modal.i18n.json';

export type ProductFilterModalProps = {
  isOpen: boolean;
  categories: ICategory[];
  filters: IFilters;
  language: Language;
  onOrderTypeChange: (order: OrderType) => void;
  onProductTypeChange: (id: number) => void;
  onCharacteristicChange: (key: string, values: string[]) => void;
  onCharacteristicsReset: () => void;
  onClose(): void;
};

export function ProductFilterModal({
  isOpen,
  categories,
  filters,
  language,
  onOrderTypeChange,
  onProductTypeChange,
  onCharacteristicChange,
  onCharacteristicsReset,
  onClose,
}: ProductFilterModalProps) {
  const { t } = useLocalTranslation(translations);

  return (
    <Modal isOpen={isOpen} title={t('title')} onClose={onClose}>
      <ProductFilterList
        categories={categories}
        filters={filters}
        language={language}
        onOrderTypeChange={onOrderTypeChange}
        onProductTypeChange={onProductTypeChange}
        onCharacteristicChange={onCharacteristicChange}
        onCharacteristicsReset={onCharacteristicsReset}
      />
    </Modal>
  );
}
