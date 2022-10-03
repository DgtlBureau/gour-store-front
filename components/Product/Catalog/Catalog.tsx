import React, { useState } from 'react';
import { SxProps } from '@mui/material';

import ArrowsIcon from '@mui/icons-material/CompareArrows';
import FilterIcon from '@mui/icons-material/FilterAltOutlined';

import { IProduct, IFiltersCharacteristic } from 'types/entities/IProduct';
import { ICategory } from 'types/entities/ICategory';
import { IOrderProduct } from 'types/entities/IOrderProduct';
import { Currency } from 'types/entities/Currency';
import { Language } from 'types/entities/Language';
import { getCountryImage } from 'helpers/countryHelper';
import { isProductFavorite } from 'pages/favorites/favoritesHelper';
import { getProductBackground } from 'helpers/categoryHelper';
import { CardSlider } from 'components/CardSlider/CardSlider';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { ToggleButton } from 'components/UI/ToggleButton/ToggleButton';
import { Button } from 'components/UI/Button/Button';
import { ProductFilterList } from '../Filter/List/List';
import { ProductFilterModal } from '../Filter/Modal/Modal';
import { ProductCard } from '../Card/Card';
import { checkCategory } from './CatalogHelpers';

import catalogSx from './Catalog.styles';

export type ProductCatalogProps = {
  title?: string;
  emptyTitle?: string;
  products: IProduct[];
  favoritesList: IProduct[];
  categories?: ICategory[];
  basket?: IOrderProduct[];
  language: Language;
  currency?: Currency;
  discount?: number;
  rows?: number;
  withFilters?: boolean;
  sx?: SxProps;
  onAdd: (product: IProduct) => void;
  onRemove: (product: IProduct) => void;
  onElect: (productId: number, isElect: boolean) => void;
  onDetail: (productId: number) => void;
};

export function ProductCatalog({
  title,
  emptyTitle,
  products,
  categories,
  basket,
  favoritesList,
  language,
  currency = 'cheeseCoin',
  discount,
  rows,
  withFilters,
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

  const withFilterList = !!withFilters && !!categories?.length;

  const productsWidthElect = products.map(product => ({
    ...product,
    isElected: isProductFavorite(product.id, favoritesList),
  }));

  const screenWidth = window.screen.width;

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

  const productList = categories
    ? productsWidthElect?.filter(
        product => checkCategory(product.categories, filters.productType),
        // checkCharacteristics(product.categories, filters.categories), // TODO: добавить фильтрацию по всем категориям
        // TODO: обсудить, мб вообще все фильтры выводить
      )
    : productsWidthElect;

  const findProductInBasket = (productId: number) => basket?.find(it => it.product.id === productId);

  const getProductCount = (productId: number, isWeightGood: boolean) => {
    const productInBasket = findProductInBasket(productId);
    return (isWeightGood ? productInBasket?.weight : productInBasket?.amount) || 0;
  };

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
            title={product.title[language]}
            description={product.description[language]}
            rating={product.grade}
            price={product.price[currency]}
            discount={discount || product.discount}
            currency={currency}
            previewImg={product.images[0]?.small || ''}
            countryImg={getCountryImage(product.categories)}
            backgroundImg={categories && getProductBackground(categories, product.categories)}
            currentCount={getProductCount(product.id, product.isWeightGood)}
            isElected={product.isElected}
            isWeightGood={product.isWeightGood}
            onAdd={() => onAdd(product)}
            onRemove={() => onRemove(product)}
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
