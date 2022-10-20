import Image from 'next/image';
import React, { memo, useState } from 'react';

import { CardMedia, SxProps } from '@mui/material';

import { useGetStockQuery } from 'store/api/warehouseApi';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';
import { IOption } from 'types/entities/IOption';
import { IOrderProduct } from 'types/entities/IOrderProduct';
import { ProductTypeLabel } from 'types/entities/IProduct';

import { useAppSelector } from 'hooks/store';
import { getDefaultGramByProductType } from 'utils/catalogUtil';

import HeartIcon from '@mui/icons-material/Favorite';
import defaultImg from 'assets/images/default.svg';
import { productGramList } from 'constants/gramList';
import { getProductKeyInBasket } from 'pages/personal-area/orders/ordersHelper';

import sx from './Card.styles';
import { ProductCardCart as Cart } from './Cart/Cart';
import { ProductCardDocket as Docket } from './Docket/Docket';
import { ProductCardRate as Rate } from './Rate/Rate';

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
  onDetail: () => void;
};

// eslint-disable-next-line prefer-arrow-callback
export const ProductCard = memo(function ProductCard({
  id,
  moyskladId,
  title,
  rating,
  discount = 10,
  price,
  productType,
  previewImg,
  backgroundImg,
  countryImg,
  isElected,
  currency,
  // gram,
  // amount,
  onAdd,
  onRemove,
  // onGramChange,
  onElect,
  onDetail,
}: ProductCardProps) {
  const [gramValue, setGramValue] = useState(() => getDefaultGramByProductType(productType));

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
  const [gramOptions] = useState<IOption[]>(() =>
    productGramList[productType]?.map(
      gram =>
        ({
          label: `${gram}\u00A0г`,
          value: String(gram),
        } || []),
    ),
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

  const inCart = !!(basketProduct && basketProduct.amount > 0);
  const backgroundImage = `url('${backgroundImg}')`;

  return (
    <Box sx={sx.card}>
      <Box sx={sx.preview}>
        <HeartIcon sx={{ ...sx.heart, ...(isElected && sx.elected) } as SxProps} onClick={onElect} />

        <Box sx={{ ...sx.previewImg, backgroundImage }} onClick={onDetail}>
          <CardMedia sx={sx.productImg} component='img' image={previewImg || defaultImg} alt='' />
        </Box>

        {countryImg && (
          <Box sx={sx.country}>
            <Image src={countryImg} objectFit='cover' height={26} width={26} alt='' />
          </Box>
        )}
      </Box>

      <Rate currency={currency} rating={rating} price={price} sx={sx.rate} />

      <Typography sx={sx.title} variant='h6' onClick={onDetail}>
        {title}
      </Typography>

      <Typography variant='caption' sx={{ ...sx.stock, ...(inCart && sx.deployedStock) }}>
        {isStockFetching && 'загружаем остатки...'}
        {!isStockFetching && isStockError && 'произошла ошибка'}
        {!isStockFetching && !moyskladId && 'не указан ID у МойСклад'}
        {!isStockFetching && !isStockError && moyskladId && <>осталось {String(stock?.value)} шт</>}
      </Typography>

      <Box sx={{ ...sx.actions, ...(inCart && sx.deployedActions) }}>
        <Docket
          gram={gramValue}
          gramOptions={gramOptions}
          onChangeGram={changeGram}
          inCart={inCart}
          price={price}
          discount={discount}
          currency={currency}
        />

        <Cart
          amount={basketProduct?.amount || 0}
          gram={gramValue}
          isDisabled={isAddDisabled}
          onAdd={handleAddClick}
          onRemove={handleRemoveClick}
        />
      </Box>
    </Box>
  );
});
