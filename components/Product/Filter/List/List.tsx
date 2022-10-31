import React from 'react';

import { SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { ToggleButton } from 'components/UI/ToggleButton/ToggleButton';
import { Typography } from 'components/UI/Typography/Typography';

import { ICategory } from 'types/entities/ICategory';
import { IFilters, OrderType } from 'types/entities/IProduct';
import { Language } from 'types/entities/Language';

import { convertOrderTypesToOptions, convertSubCategoriesToOptions } from 'utils/catalogUtil';

import { orderTypeOptions } from 'constants/filters';

import { FilterMultiselectProps, ProductFilterMultiselect } from '../Multiselect/Multiselect';
import { ProductFilterSelect } from '../Select/Select';
import listSx from './List.styles';

export type CatalogFilterProps = {
  categories: ICategory[];
  filters: IFilters;
  language: Language;
  sx?: SxProps;
  onOrderTypeChange: (order: OrderType) => void;
  onProductTypeChange: (id: number) => void;
  onCharacteristicChange: (key: string, values: string[]) => void;
  onCharacteristicsReset: () => void;
};

export function ProductFilterList({
  categories,
  filters,
  language,
  sx,
  onOrderTypeChange,
  onProductTypeChange,
  onCharacteristicChange,
  onCharacteristicsReset,
}: CatalogFilterProps) {
  const characteristics = categories.reduce((acc, it) => {
    if (it.id === filters.productType && it.subCategories) acc.push(...it.subCategories);
    return acc;
  }, [] as ICategory[]);

  const isMobile = window.screen.width < 900;

  const filtersPropList: FilterMultiselectProps[] = characteristics.map(characteristic => ({
    key: characteristic.id,
    title: characteristic.title[language],
    selected: filters.characteristics[characteristic.id]?.map(it => it.toString()) || [],
    options: convertSubCategoriesToOptions(characteristic.subCategories || [], language),
    onChange: (values: string[]) => onCharacteristicChange(characteristic.id.toString(), values),
  }));

  const orderType = orderTypeOptions.find(option => option.type === filters.orderType);

  return (
    <Box sx={{ ...listSx.list, ...sx } as SxProps}>
      <Box sx={listSx.summary}>
        <ProductFilterSelect
          key='products-order'
          title={orderType?.title[language] || ''}
          selected={filters.orderType}
          options={convertOrderTypesToOptions(orderTypeOptions, language)}
          onChange={onOrderTypeChange}
          isMobile={isMobile}
        />

        <Box sx={listSx.categories}>
          {categories?.map(category => (
            <ToggleButton
              key={category.id}
              selected={filters.productType === category.id}
              onChange={() => onProductTypeChange(category.id)}
            >
              {category.title[language]}
            </ToggleButton>
          ))}
        </Box>
      </Box>

      {characteristics.length > 0 && (
        <Box sx={listSx.characteristics}>
          {isMobile && (
            <Typography sx={listSx.title} variant='h6' color='primary'>
              Фильтры
            </Typography>
          )}

          {filtersPropList.map(props => (
            <ProductFilterMultiselect {...props} isMobile={isMobile} />
          ))}

          <Button sx={listSx.resetBtn} variant='outlined' onClick={onCharacteristicsReset}>
            Сбросить всё
          </Button>
        </Box>
      )}
    </Box>
  );
}
