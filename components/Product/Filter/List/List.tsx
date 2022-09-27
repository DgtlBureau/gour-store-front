import React from 'react';
import { SxProps } from '@mui/material';

import ArrowsIcon from '@mui/icons-material/CompareArrows';

import { Box } from 'components/UI/Box/Box';
import { ToggleButton } from 'components/UI/ToggleButton/ToggleButton';
import { ProductFilterMultiselect } from 'components/Product/Filter/Multiselect/Multiselect';
import { CHARACTERISTICS } from 'constants/characteristics';
import { ICategoryNew } from 'types/entities/ICategory';
import { Language } from 'types/entities/Language';
import { IFiltersCharacteristic } from 'types/entities/IProduct';

export type CatalogFilterProps = {
  categories: ICategoryNew[];
  filters: IFiltersCharacteristic;
  language: Language;
  sx?: SxProps;
  onReverse: () => void;
  onCategoryChange: (key: number) => void;
  onCharacteristicChange: (key: string, selected: string[]) => void;
};

export function ProductFilterList({
  categories,
  filters,
  language,
  sx,
  onReverse,
  onCategoryChange,
  onCharacteristicChange,
}: CatalogFilterProps) {
  const features = Object.keys(CHARACTERISTICS).filter(
    it => CHARACTERISTICS[it].categoryKey === filters.category?.toString() || CHARACTERISTICS[it].categoryKey === 'all',
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', ...sx }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <ToggleButton
          selected={filters.isReversed}
          sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '10px' }}
          onChange={onReverse}
        >
          <ArrowsIcon sx={{ transform: 'rotate(90deg)' }} />
        </ToggleButton>

        {categories?.map(category => (
          <ToggleButton
            key={category.id}
            selected={filters.category === category.id}
            sx={{ marginRight: '10px' }}
            onChange={() => onCategoryChange(category.id)}
          >
            {category.title[language]}
          </ToggleButton>
        ))}
      </Box>

      {/* <Box sx={{ display: 'flex', marginTop: '10px' }}>
        {features.map(feature => (
          <ProductFilterMultiselect
            key={feature}
            title={CHARACTERISTICS[feature].label[language]}
            selected={filters.characteristics[feature] || []}
            options={CHARACTERISTICS[feature].values.map(it => ({ value: it.key, label: it.label[language] }))}
            sx={{ marginRight: '10px' }}
            onChange={selected => onCharacteristicChange(feature, selected)}
          />
        ))}
      </Box> */}
    </Box>
  );
}
