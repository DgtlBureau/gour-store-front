import React, { useMemo, useState } from 'react';

import { SxProps } from '@mui/material';

import { CardSlider } from 'components/CardSlider/CardSlider';
import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { ToggleButton } from 'components/UI/ToggleButton/ToggleButton';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';
import { ICategory } from 'types/entities/ICategory';
import { IFiltersCharacteristic, IProduct, ProductTypeLabel } from 'types/entities/IProduct';
import { Language } from 'types/entities/Language';

import ArrowsIcon from '@mui/icons-material/CompareArrows';
import FilterIcon from '@mui/icons-material/FilterAltOutlined';

import { ProductCard } from '../Card/Card';
import { ProductFilterList } from '../Filter/List/List';
import { ProductFilterModal } from '../Filter/Modal/Modal';
import catalogSx from './Catalog.styles';
import { checkCategory } from './CatalogHelpers';

type ExtendedProduct = IProduct & {
  isElected: boolean;
  productType: ProductTypeLabel;
  backgroundImg?: string;
  countryImg?: string;
};

export type ProductCatalogProps = {
  title?: string;
  emptyTitle?: string;
  products: ExtendedProduct[];
  categories?: ICategory[];
  language: Language;
  currency?: Currency;
  discount?: number;
  rows?: number;
  withFilters?: boolean;
  sx?: SxProps;
  onAdd: (product: IProduct, gram: number) => void;
  onRemove: (product: IProduct, gram: number) => void;
  onElect: (productId: number, isElect: boolean) => void;
  onDetail: (productId: number) => void;
};

export function ProductCatalog({
  title,
  emptyTitle,
  products,
  categories,
  language,
  currency = 'cheeseCoin',
  discount,
  rows,
  withFilters = false,
  sx,
  onAdd,
  onRemove,
  onElect,
  onDetail,
}: ProductCatalogProps) {
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [filters, setFilters] = useState<IFiltersCharacteristic>({
    isReversed: false,
    productType: 'all',
    categories: {},
  });

  const withFilterList = withFilters && !!categories?.length;

  const screenWidth = window.screen.width; // TODO: переписать на медиа-выражение, тк при перевороте экрана не меняется

  const toggleSequence = () => setFilters({ ...filters, isReversed: !filters.isReversed });
  const selectCategory = (value: number) =>
    setFilters({
      ...filters,
      productType: filters.productType !== value ? value : 'all',
      categories: {},
    });

  const selectCharacteristics = () => {
    // TODO: реализация фильтров списка товаров
  };

  const productList = useMemo(
    () =>
      categories
        ? products.filter(
            product => checkCategory(product.categories || [], filters.productType),
            // checkCharacteristics(product.categories, filters.categories), // TODO: добавить фильтрацию по всем категориям
            // TODO: обсудить, мб вообще все фильтры выводить
          )
        : products,
    [categories, products],
  );

  const getCatalogRows = () => {
    const length = productList?.length || 0;
    if (length > 8) return 3;
    if (length > 4) return 2;
    return 1;
  };

  const openFilterModal = () => setFilterModalIsOpen(true);
  const closeFilterModal = () => setFilterModalIsOpen(false);

  return (
    <Box sx={sx}>
      {!!categories && screenWidth <= 900 && (
        <Box sx={catalogSx.header}>
          <Typography variant='h4' sx={catalogSx.title}>
            {title}
          </Typography>

          <Box>
            <ToggleButton
              selected={filters.isReversed}
              sx={{ padding: '4px', marginRight: '6px' }}
              onChange={toggleSequence}
            >
              <ArrowsIcon fontSize='small' sx={{ transform: 'rotate(90deg)' }} />
            </ToggleButton>

            <Button size='small' onClick={openFilterModal} sx={catalogSx.filterBtn}>
              <FilterIcon fontSize='small' />
            </Button>
          </Box>
        </Box>
      )}

      <CardSlider
        title={screenWidth > 900 || !categories ? title : undefined}
        emptyTitle={emptyTitle || 'Продукты не найдены'}
        key={`catalog/${filters.productType}`}
        spaceBetween={10}
        rows={rows || getCatalogRows()}
        head={
          withFilterList && (
            <ProductFilterList
              sx={catalogSx.filters}
              categories={categories}
              filters={filters}
              language={language}
              onReverse={toggleSequence}
              onCategoryChange={selectCategory}
              onCharacteristicChange={selectCharacteristics}
            />
          )
        }
        cardsList={(filters.isReversed ? productList.reverse() : productList).map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title[language]}
            description={product.description[language]}
            rating={product.grade}
            price={product.price[currency]}
            discount={10} // FIXME: TODO: удоли
            currency={currency}
            productType={product.productType}
            previewImg={product.images[0]?.small || ''}
            countryImg={product.countryImg}
            backgroundImg={product.backgroundImg}
            isElected={product.isElected}
            isWeightGood={product.isWeightGood}
            onAdd={(gram: number) => onAdd(product, gram)}
            onRemove={(gram: number) => onRemove(product, gram)}
            onElect={() => onElect(product.id, product.isElected)}
            onDetail={() => onDetail(product.id)}
          />
        ))}
      />
      {!!categories && (
        <ProductFilterModal
          categories={categories}
          filters={filters}
          language={language}
          onCategoryChange={selectCategory}
          onCharacteristicChange={selectCharacteristics}
          isOpen={filterModalIsOpen}
          onClose={closeFilterModal}
        />
      )}
    </Box>
  );
}
