import React, { useState } from 'react';
import { SxProps } from '@mui/material';

import ArrowsIcon from '@mui/icons-material/CompareArrows';
import FilterIcon from '@mui/icons-material/FilterAltOutlined';

import { CardSlider } from '../../CardSlider/CardSlider';
import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { ToggleButton } from '../../UI/ToggleButton/ToggleButton';
import { Button } from '../../UI/Button/Button';
import { ProductFilterList, Filters } from '../Filter/List/List';
import { ProductFilterModal } from '../Filter/Modal/Modal';
import { ProductCard } from '../Card/Card';
import { IProduct } from '../../../@types/entities/IProduct';
import { ICategory } from '../../../@types/entities/ICategory';
import { IOrderProduct } from '../../../@types/entities/IOrderProduct';
import { Currency } from '../../../@types/entities/Currency';
import { Language } from '../../../@types/entities/Language';

import catalogSx from './Catalog.styles';

export type ProductCatalogProps = {
  title?: string;
  products: IProduct[];
  categories?: ICategory[];
  basket: IOrderProduct[];
  language: Language;
  currency?: Currency;
  rows?: number;
  sx?: SxProps;
  onAdd: (product: IProduct) => void;
  onRemove: (product: IProduct) => void;
  onElect: (product: IProduct) => void;
  onDetail: (productId: number) => void;
};

export function ProductCatalog({
  title,
  products,
  categories,
  basket,
  language,
  currency = 'cheeseCoin',
  rows,
  sx,
  onAdd,
  onRemove,
  onElect,
  onDetail,
}: ProductCatalogProps) {
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    isReversed: false,
    category: 'all',
    characteristics: {},
  });

  const screenWidth = window.screen.width;

  const toggleSequence = () => setFilters({ ...filters, isReversed: !filters.isReversed });
  const selectCategory = (value: string) =>
    setFilters({
      ...filters,
      category: filters.category !== value ? value : 'all',
      characteristics: {},
    });
  const selectCharacteristics = (key: string, selected: string[]) =>
    setFilters({
      ...filters,
      characteristics: {
        ...filters.characteristics,
        [key]: selected,
      },
    });

  const checkCategory = (key: string) => filters.category === 'all' || key === filters.category;
  const checkCharacteristics = (characteristics: { [key: string]: string }) =>
    Object.keys(filters.characteristics).every(
      it => filters.characteristics[it].length === 0 || filters.characteristics[it].includes(characteristics[it])
    );

  const productList = categories
    ? products
        ?.filter(product => checkCategory(product.category.key))
        .filter(product => checkCharacteristics(product.characteristics))
    : products;

  const findProductInBasket = (productId: number) => basket.find(it => it.product.id === productId);

  const getProductCount = (productId: number, isWeightGood: boolean) => {
    const productInBasket = findProductInBasket(productId);
    return (isWeightGood ? productInBasket?.weight : productInBasket?.amount) || 0;
  };

  const getCatalogRows = () => {
    const length = productList?.length || 0;
    if (length > 8) return 3;
    else if (length > 4) return 2;
    else return 1;
  };

  const openFilterModal = () => setFilterModalIsOpen(true);
  const closeFilterModal = () => setFilterModalIsOpen(false);

  return (
    <Box sx={sx}>
      {!!categories && screenWidth <= 900 && (
        <Box sx={catalogSx.header}>
          <Typography variant="h4" sx={catalogSx.title}>
            {title}
          </Typography>

          <Box>
            <ToggleButton
              selected={filters.isReversed}
              sx={{ padding: '4px', marginRight: '6px' }}
              onChange={toggleSequence}
            >
              <ArrowsIcon fontSize="small" sx={{ transform: 'rotate(90deg)' }} />
            </ToggleButton>

            <Button size="small" onClick={openFilterModal} sx={catalogSx.filterBtn}>
              <FilterIcon fontSize="small" />
            </Button>
          </Box>
        </Box>
      )}

      {productList.length ? (
        <CardSlider
          title={screenWidth > 900 || !categories ? title : undefined}
          key={`catalog/${filters.category}`}
          spaceBetween={0}
          rows={rows || getCatalogRows()}
          head={
            !!categories && (
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
              previewSrc={product.images[0] ? product.images[0].small : ''}
              currency={currency}
              currentCount={getProductCount(product.id, product.isWeightGood)}
              inCart={!!findProductInBasket(product.id)}
              isElected={false}
              isWeightGood={product.isWeightGood}
              onAdd={() => onAdd(product)}
              onRemove={() => onRemove(product)}
              onElect={() => onElect(product)}
              onDetail={() => onDetail(product.id)}
            />
          ))}
        />
      ) : (
        <Typography variant="h5" color="primary" sx={catalogSx.emptyTitle}>
          Продукты не найдены
        </Typography>
      )}

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
