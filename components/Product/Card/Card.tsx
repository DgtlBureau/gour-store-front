import Image from 'next/image';
import React, { memo } from 'react';

import { CardMedia, SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';
import { ProductTypeLabel } from 'types/entities/IProduct';

import HeartIcon from '@mui/icons-material/Favorite';
import defaultImg from 'assets/images/default.svg';
import { productGramList } from 'constants/gramList';

import sx from './Card.styles';
import { ProductCardCart as Cart } from './Cart/Cart';
import { ProductCardDocket as Docket } from './Docket/Docket';
import { ProductCardRate as Rate } from './Rate/Rate';

export type ProductCardProps = {
  id: number;
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
  gram: number;
  amount: number;
  remains?: number;
  onAdd: () => void;
  onRemove: () => void;
  onGramChange: (value: number) => void;
  onElect: () => void;
  onDetail: () => void;
};

// eslint-disable-next-line prefer-arrow-callback
export const ProductCard = memo(function ProductCard({
  id,
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
  gram,
  amount,
  remains,
  onAdd,
  onRemove,
  onGramChange,
  onElect,
  onDetail,
}: ProductCardProps) {
  const gramOptions =
    productGramList[productType]?.map(value => ({ label: `${value}г`, value: value.toString() })) || [];

  const gramValue = gram || +gramOptions[0].value;

  // const basketProductsKey = getProductKeyInBasket(id, gram);
  // const orderProduct = useAppSelector(state => state.order.products[basketProductsKey]);

  // const productCount = orderProduct?.amount || 0;

  const changeGram = (value: string | number) => onGramChange(+value);

  const backgroundImage = `url('${backgroundImg}')`;

  const inCart = amount > 0;

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
        осталось {remains || '?'} шт
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

        <Cart amount={amount} gram={gramValue} onAdd={onAdd} onRemove={onRemove} />
      </Box>
    </Box>
  );
});
