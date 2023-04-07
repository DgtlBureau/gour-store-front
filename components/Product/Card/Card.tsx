import Image from 'next/image';
import React, { memo, useState } from 'react';

import { CardMedia, SxProps } from '@mui/material';
import { getProductKeyInBasket } from 'pages/personal-area/orders/ordersHelper';

import {useLazyGetStockQuery} from 'store/api/warehouseApi';

import { Box } from 'components/UI/Box/Box';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { IOption } from 'types/entities/IOption';
import { IOrderProduct } from 'types/entities/IOrderProduct';
import { ProductTypeLabel } from 'types/entities/IProduct';

import { productGramList } from 'constants/gramList';
import { Path } from 'constants/routes';
import { useAppSelector } from 'hooks/store';
import { getDefaultGramByProductType } from 'utils/catalogUtil';

import { ProductCardCart as Cart } from './Cart/Cart';
import { ProductCardDocket as Docket } from './Docket/Docket';
import { ProductCardRate as Rate } from './Rate/Rate';

import sx from './Card.styles';

import HeartIcon from '@mui/icons-material/Favorite';
import defaultImg from 'assets/images/default.svg';
import {getPriceByGrams} from '../../../utils/currencyUtil';

export type ProductCardProps = {
  id: number;
  moyskladId: string | null;
  title: string;
  rating: number;
  price: number;
  productType: ProductTypeLabel;
  discount?: number;
  previewImg: string;
  backgroundImg?: string;
  countryImg?: string;
  isElected: boolean;
  onAdd: (gram: number) => void;
  onRemove: (gram: number) => void;
  onElect: () => void;
  defaultWeight?: number;
  defaultStock?: object;
  weight: number;
};

export const getStockLabel = (
  isStockFetching: boolean,
  isStockError: boolean,
  moyskladId: string | null,
  totalWeight: number,
  currentGram: number,
  stockValue?: string,
) => {
  if (totalWeight) {
    const left = Math.floor(totalWeight / currentGram);
    return `осталось ${left} шт`
  }

  if (isStockFetching) return 'загружаем...';

  if (!moyskladId || isStockError) return 'нет на складе';

  if (stockValue) return `осталось ${stockValue} шт`;

  return 'нет на складе';
};

// eslint-disable-next-line prefer-arrow-callback
export const ProductCard = memo(function ProductCard({
  id,
  moyskladId,
  title,
  rating,
  discount = 0,
  price,
  productType,
  previewImg,
  backgroundImg,
  countryImg,
  isElected,
  onAdd,
  onRemove,
  onElect,
  defaultWeight,
  defaultStock,
  weight
}: ProductCardProps) {
  const [gramValue, setGramValue] = useState(() => productType && getDefaultGramByProductType(productType));

  const shouldSkipGettingStocks = !gramValue || !moyskladId;
  const [
    getStockQuery, {
      data: stock,
      isFetching: isStockFetching,
      isError: isStockError
    }
   ] = useLazyGetStockQuery();

  const someStock: any = Object.keys(stock ?? {}).length ? stock : defaultStock;

  const basketProductsKey = getProductKeyInBasket(id, gramValue);
  const basketProduct = useAppSelector(state => state.order.products[basketProductsKey]) as IOrderProduct | undefined;
  const [gramOptions] = useState<IOption[]>(
    () =>
      productGramList[productType]?.map(
        gram =>
          ({
            label: `${gram}\u00A0г`,
            value: String(gram),
          } || []),
      ) || [],
  );

  const changeGram = (value: string | number) => {
    setGramValue(+value);
    if (!weight) {
      getStockQuery({
        city: 'Санкт-Петербург',
        gram: String(value),
        warehouseId: String(moyskladId),
      })
    }
  }

  const priceByGram = getPriceByGrams(price, gramValue);

  const maxPossibleAmount = weight ? (weight / gramValue) : someStock?.value;
  const isAmountMoreThanCost = !isStockFetching && (basketProduct?.amount || 0) >= Number(maxPossibleAmount);
  const isAddDisabled =
    isStockFetching || isStockError || isAmountMoreThanCost || shouldSkipGettingStocks || (!someStock?.value && !weight);

  const handleAddClick = () => {
    if (!isAddDisabled) onAdd(gramValue);
  };

  const handleRemoveClick = () => {
    onRemove(gramValue);
  };

  const backgroundImage = `url('${backgroundImg}')`;

  const stockLabel = getStockLabel(isStockFetching, isStockError, moyskladId, weight,gramValue,someStock?.value);

  return (
    <Box sx={sx.card}>
      <Box sx={sx.preview}>
        <HeartIcon sx={{ ...sx.heart, ...(isElected && sx.elected) } as SxProps} onClick={onElect} />
        <Link href={`/${Path.PRODUCTS}/${id}`}>
          <CardMedia
            sx={{ ...sx.previewImg, backgroundImage }}
            component='img'
            image={previewImg || defaultImg}
            alt='product'
          />
        </Link>

        {countryImg && (
          <Box sx={sx.country}>
            <Image src={countryImg} objectFit='cover' height={26} width={26} alt='' />
          </Box>
        )}
      </Box>
      <Rate rating={rating} stockLabel={stockLabel} />
      <Link href={`/${Path.PRODUCTS}/${id}`} sx={{ textDecoration: 'none' }}>
        <Typography sx={sx.title} variant='h6'>
          {title}
        </Typography>
      </Link>

      <Box sx={sx.actions}>
        <Docket
          gram={gramValue}
          gramOptions={gramOptions}
          onChangeGram={changeGram}
          price={priceByGram}
          discount={discount}
        />

        <Cart
          amount={basketProduct?.amount}
          gram={gramValue}
          isDisabled={isAddDisabled}
          onAdd={handleAddClick}
          onRemove={handleRemoveClick}
        />
      </Box>
    </Box>
  );
});
