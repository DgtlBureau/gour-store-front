import Image from 'next/image';
import React, { memo, useState } from 'react';

import { CardMedia, SxProps } from '@mui/material';
import { getProductKeyInBasket } from 'pages/personal-area/orders/ordersHelper';

import { useGetStockQuery } from 'store/api/warehouseApi';

import { Box } from 'components/UI/Box/Box';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';
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
  currency: Currency;
  isElected: boolean;
  onAdd: (gram: number) => void;
  onRemove: (gram: number) => void;
  onElect: () => void;
};

export const getStockLabel = (
  isStockFetching: boolean,
  isStockError: boolean,
  moyskladId: string | null,
  stockValue?: string,
) => {
  if (isStockFetching) return 'загружаем...';

  if (!moyskladId || isStockError) return 'ошибка';

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
  currency,
  onAdd,
  onRemove,
  onElect,
}: ProductCardProps) {
  const [gramValue, setGramValue] = useState(() => productType && getDefaultGramByProductType(productType));

  const {
    data: stock,
    isFetching: isStockFetching,
    isError: isStockError,
  } = useGetStockQuery(
    {
      city: 'Санкт-Петербург',
      gram: String(gramValue),
      warehouseId: String(moyskladId),
    },
    {
      skip: !gramValue || !moyskladId,
    },
  );

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

  const changeGram = (value: string | number) => setGramValue(+value);

  const isAmountMoreThanCost = !isStockFetching && (basketProduct?.amount || 0) >= Number(stock?.value);
  const isAddDisabled = isStockFetching || isStockError || isAmountMoreThanCost;

  const handleAddClick = () => {
    if (!isAddDisabled) onAdd(gramValue);
  };

  const handleRemoveClick = () => {
    onRemove(gramValue);
  };

  const backgroundImage = `url('${backgroundImg}')`;

  const stockLabel = getStockLabel(isStockFetching, isStockError, moyskladId, stock?.value);

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
          price={price}
          discount={discount}
          currency={currency}
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
