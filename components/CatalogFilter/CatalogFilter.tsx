import React from 'react';
import { useRouter } from 'next/router';

import ArrowsIcon from '@mui/icons-material/CompareArrows';

import { Box } from 'components/UI/Box/Box';
import { ToggleButton } from 'components/UI/ToggleButton/ToggleButton';
import { FilterMultiselect } from 'components/FilterMultiselect/FilterMultiselect';
import { CHARACTERISTICS } from '../../constants/characteristics';
import { LocalConfig } from 'hooks/useLocalTranslation'; 
import { ICategory } from '../../@types/entities/ICategory';

export type Filters = {
  isReversed: boolean;
  category: string;
  characteristics: {
    [key: string]: string[];
  },
};

export type CatalogFilterProps = {
  categories: ICategory[];
  filters: Filters;
  onReverse: () => void;
  onCategoryChange: (key: string) => void;
  onCharacteristicChange: (key: string, selected: string[]) => void;
}

export function CatalogFilter({
  categories,
  filters,
  onReverse,
  onCategoryChange,
  onCharacteristicChange,
}: CatalogFilterProps) {
  const router = useRouter();

  const locale: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';

  const features = Object.keys(CHARACTERISTICS)
    .filter(it => (
      CHARACTERISTICS[it].categoryKey === filters.category
      || CHARACTERISTICS[it].categoryKey === 'all'
    )
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <ToggleButton
          selected={filters.isReversed}
          sx={{ marginRight: '10px' }}
          onChange={onReverse}
        >
          <ArrowsIcon sx={{ transform: 'rotate(90deg)' }} />
        </ToggleButton>
        {
          categories?.map(category => (
            <ToggleButton
              key={category.id}
              selected={filters.category === category.key}
              sx={{ marginRight: '10px' }}
              onChange={() => onCategoryChange(category.key)}
            >
              {category.title[locale]} 
            </ToggleButton>
          ))
        }
      </Box>
      <Box sx={{ display: 'flex', marginTop: '10px' }}>
        {
          features.map(feature => (
            <FilterMultiselect
              key={feature}
              title={CHARACTERISTICS[feature].label[locale]}
              selected={filters.characteristics[feature] || []}
              options={CHARACTERISTICS[feature].values.map(it => ({ value: it.key, label: it.label[locale]}))}
              sx={{ marginRight: '10px' }}
              onChange={selected => onCharacteristicChange(feature, selected)}
            />
          ))
        }
      </Box>
    </Box>
  );
}
