import React, { memo, useMemo, useState } from 'react';

import { SxProps, Theme, useMediaQuery } from '@mui/material';

import { Catalog } from 'components/Catalog/Catalog';
import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';
import { ICategory } from 'types/entities/ICategory';
import { IExtendedProduct, IFilters, IProduct, OrderType } from 'types/entities/IProduct';
import { Language } from 'types/entities/Language';

import FilterIcon from '@mui/icons-material/FilterAltOutlined';

import { ProductCard } from '../Card/Card';
import { ProductFilterList } from '../Filter/List/List';
import { ProductFilterModal } from '../Filter/Modal/Modal';
import catalogSx from './Catalog.styles';

export type ProductCatalogProps = {
  title?: string;
  emptyText?: string;
  products: IExtendedProduct[];
  categories?: ICategory[];
  language: Language;
  currency?: Currency;
  discount?: number;
  withFilters?: boolean;
  sx?: SxProps;
  onAdd: (product: IProduct, gram: number) => void;
  onRemove: (product: IProduct, gram: number) => void;
  onElect: (productId: number, isElect: boolean) => void;
};

export const ProductCatalog = memo(
  ({
    title,
    emptyText = 'Продукты не найдены',
    products,
    categories,
    language,
    currency = 'cheeseCoin',
    discount,
    withFilters = false,
    sx,
    onAdd,
    onRemove,
    onElect,
  }: ProductCatalogProps) => {
    const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
    const [filters, setFilters] = useState<IFilters>({
      orderType: 'default',
      productType: null,
      characteristics: {},
    });

    const withFilterList = withFilters && !!categories?.length;

    const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    const checkProductType = (product: IExtendedProduct) => {
      const isAll = !filters.productType;
      const productTypeIsMatches = !!product.categories?.find(category => category.id === filters.productType);

      return isAll || productTypeIsMatches;
    };

    const checkCharacteristics = (product: IExtendedProduct) => {
      if (!product.categories?.length) return false;

      const productCharacteristicIds = product.categories
        .map(category => category.id)
        .filter(id => !categories?.find(category => category.id === id));

      const filterCharacteristicIds = Object.keys(filters.characteristics).filter(
        id => filters.characteristics[id].length > 0,
      );

      // true - если характеристики продукта содержатся во всех фильтрах
      const isAllMatches = filterCharacteristicIds.every(filterCharacteristicId => {
        const filterValues = filters.characteristics[filterCharacteristicId];

        // true - если фильтр содержит одну из характеристик продукта
        const includesMatches = productCharacteristicIds.some(productCharacteristicId => {
          const includesCharacteristic = filterValues.includes(productCharacteristicId.toString());

          return includesCharacteristic;
        });

        return includesMatches;
      });

      return isAllMatches;
    };

    const sortByPrice = (sortedProducts: IExtendedProduct[]) =>
      sortedProducts.sort((prev, it) => prev.price[currency] - it.price[currency]);

    const sortByDiscount = (unsortedProducts: IExtendedProduct[]) =>
      unsortedProducts.sort((prev, it) =>
        it.discount === prev.discount ? it.price[currency] - prev.price[currency] : it.discount - prev.discount,
      );

    const sortByRate = (unsortedProducts: IExtendedProduct[]) =>
      unsortedProducts.sort((prev, it) =>
        it.grade === prev.grade ? it.gradesCount - prev.gradesCount : it.grade - prev.grade,
      );

    const sortByOrderType = (unsortedProducts: IExtendedProduct[]) => {
      switch (filters.orderType) {
        case 'price':
          return sortByPrice(unsortedProducts);

        case 'price-reverse':
          return sortByPrice(unsortedProducts).reverse();

        case 'discount':
          return sortByDiscount(unsortedProducts);

        case 'rate':
          return sortByRate(unsortedProducts);

        default:
          return unsortedProducts;
      }
    };

    const productList = useMemo(() => {
      if (withFilterList) {
        const filteredProducts = products.filter(checkProductType).filter(checkCharacteristics);
        const sortedProducts = sortByOrderType(filteredProducts);

        return sortedProducts;
      }
      return products;
    }, [filters, products, withFilterList]);

    const changeProductType = (id: number) => {
      const isSelected = filters.productType === id;

      const productType = isSelected ? null : id;

      setFilters({ ...filters, productType, characteristics: {} });
    };

    const changeCharacteristics = (key: string, values: string[]) => {
      const characteristics = { ...filters.characteristics, [key]: values };

      setFilters({ ...filters, characteristics });
    };

    const resetCharacteristics = () => setFilters({ ...filters, characteristics: {} });

    const changeOrderType = (value: OrderType) => setFilters({ ...filters, orderType: value });

    const openFilterModal = () => setFilterModalIsOpen(true);
    const closeFilterModal = () => setFilterModalIsOpen(false);

    const cardList = useMemo(
      () =>
        productList.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            moyskladId={product.moyskladId}
            title={product.title[language]}
            rating={product.grade}
            price={product.price[currency]}
            discount={discount || product.discount}
            currency={currency}
            productType={product.productType}
            previewImg={product.images[0]?.small || ''}
            countryImg={product.countryImg}
            backgroundImg={product.backgroundImg}
            isElected={product.isElected}
            onAdd={(gram: number) => onAdd(product, gram)}
            onRemove={(gram: number) => onRemove(product, gram)}
            onElect={() => onElect(product.id, product.isElected)}
          />
        )),
      [productList],
    );

    return (
      <Box sx={sx}>
        <Catalog
          emptyText={emptyText}
          cardList={cardList}
          head={
            <Box sx={catalogSx.header}>
              <Typography variant='h4' sx={catalogSx.title}>
                {title}
              </Typography>

              {withFilterList && isDesktop ? (
                <ProductFilterList
                  sx={catalogSx.filters}
                  categories={categories}
                  filters={filters}
                  language={language}
                  onOrderTypeChange={changeOrderType}
                  onProductTypeChange={changeProductType}
                  onCharacteristicChange={changeCharacteristics}
                  onCharacteristicsReset={resetCharacteristics}
                />
              ) : (
                <Button size='small' onClick={openFilterModal} sx={catalogSx.filterBtn}>
                  <FilterIcon fontSize='small' />
                </Button>
              )}
            </Box>
          }
        />

        {!!categories && (
          <ProductFilterModal
            isOpen={filterModalIsOpen}
            categories={categories}
            filters={filters}
            language={language}
            onOrderTypeChange={changeOrderType}
            onProductTypeChange={changeProductType}
            onCharacteristicChange={changeCharacteristics}
            onCharacteristicsReset={resetCharacteristics}
            onClose={closeFilterModal}
          />
        )}
      </Box>
    );
  },
);
