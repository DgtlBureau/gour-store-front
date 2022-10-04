import React from 'react';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { ICategory } from 'types/entities/ICategory';
import { Language } from 'types/entities/Language';
import { IFiltersCharacteristic } from 'types/entities/IProduct';
import translations from './Modal.i18n.json';
import { Modal } from 'components/UI/Modal/Modal';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { ToggleButton } from 'components/UI/ToggleButton/ToggleButton';
// import { ProductFilterMultiselect } from '../Multiselect/Multiselect';

const sx = {
  title: {
    marginBottom: '10px',
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    color: 'text.secondary',
  },
};

export type ProductFilterModalProps = {
  isOpen: boolean;
  categories: ICategory[];
  filters: IFiltersCharacteristic;
  language: Language;
  onCategoryChange: (key: number) => void;
  onCharacteristicChange: (key: string, selected: string[]) => void;
  onClose(): void;
};

export function ProductFilterModal({
  isOpen,
  categories,
  filters,
  language,
  onCategoryChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCharacteristicChange,
  onClose,
}: ProductFilterModalProps) {
  const { t } = useLocalTranslation(translations);

  // const features = Object.keys(CHARACTERISTICS).filter(
  //   it => CHARACTERISTICS[it].categoryKey === filters.productType || CHARACTERISTICS[it].categoryKey === 'all',
  // );
  // TODO: реализация фильтров

  return (
    <Modal isOpen={isOpen} title={t('title')} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>
          {categories?.map(category => (
            <ToggleButton
              key={category.id}
              selected={filters.productType === category.id}
              sx={{ marginRight: '10px' }}
              onChange={() => onCategoryChange(category.id)}
            >
              {category.title[language]}
            </ToggleButton>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
          <Typography variant='h6' sx={sx.title}>
            {t('filters')}
          </Typography>

          {/* {features.map(feature => (
            <ProductFilterMultiselect
              key={feature}
              title={CHARACTERISTICS[feature].label[language]}
              selected={filters.categories[feature] || []}
              options={CHARACTERISTICS[feature].values.map(it => ({
                value: it.key,
                label: it.label[language],
              }))}
              sx={{ marginBottom: '10px' }}
              isMobile
              onChange={selected => onCharacteristicChange(feature, selected)}
            />
          ))} */}
        </Box>
      </Box>
    </Modal>
  );
}
