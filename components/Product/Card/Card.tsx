import Image from 'next/image';
import React, { memo, useMemo, useState } from 'react';

import { CardMedia } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { SelectOption } from 'components/UI/Select/Select';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';
import { ProductTypeLabel } from 'types/entities/IProduct';

import { useAppSelector } from 'hooks/store';

import HeartIcon from '@mui/icons-material/Favorite';
import defaultImg from 'assets/no-image.svg';
import { getProductKeyInBasket } from 'pages/personal-area/orders/ordersHelper';

import sx from './Card.styles';
import { ProductCardCart as Cart } from './Cart';
import { ProductCardDocket as Docket } from './Docket';
import { ProductCardRate as Rate } from './Rate';

export const productGramList: Record<ProductTypeLabel, number[]> = {
  Мясо: [100, 200, 300, 400, 500],
  Сыр: [150, 200, 250, 300, 350, 400],
};

export const getDefaultGramByProductType = (label: ProductTypeLabel): number => {
  const gramObj = {
    Мясо: 100,
    Сыр: 150,
  };

  return gramObj[label];
};

export type ProductCardProps = {
  id: number;
  title: string;
  description: string;
  rating: number;
  isWeightGood: boolean;
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
  title,
  description,
  rating,
  isWeightGood,
  discount = 10,
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
  onDetail,
}: ProductCardProps) {
  const [productGramValue, selectProductGramValue] = useState(() => getDefaultGramByProductType(productType));

  // if (!productType) throw new Error('не прокинул categories'); // FIXME:

  const basketProductsKey = getProductKeyInBasket(id, productGramValue);
  const basket = useAppSelector(state => state.order.products[basketProductsKey]);
  const [productGramOptions] = useState<SelectOption[]>(() =>
    productGramList[productType]?.map(
      // FIXME: удолить ?. оператор
      gram =>
        ({
          label: `${gram} гр.`,
          value: gram,
        } || []),
    ),
  );

  const productCount = basket?.amount || 0;

  const onSelectGram = (value: string | number) => selectProductGramValue(+value);

  const backgroundImage = `url('${backgroundImg}')`;

  return (
    <Box sx={sx.card}>
      <Box sx={sx.preview}>
        <HeartIcon sx={{ ...sx.heart, ...(isElected && sx.elected) }} onClick={onElect} />

        <Box sx={{ ...sx.previewImg, backgroundImage }} onClick={onDetail}>
          <CardMedia sx={sx.productImg} component='img' image={previewImg || defaultImg} alt='' />
        </Box>

        {countryImg && (
          <Box sx={sx.country}>
            <Image src={countryImg} objectFit='cover' height={26} width={26} alt='' />
          </Box>
        )}
      </Box>
      <Rate currency={currency} rating={rating} price={price} isWeightGood={isWeightGood} sx={sx.rate} />
      <div role='button' tabIndex={0} onKeyPress={undefined} onClick={onDetail}>
        <Typography sx={sx.title} variant='h6'>
          {title}
        </Typography>
      </div>
      <Typography variant='body2' sx={sx.description}>
        {description}
      </Typography>
      <Typography variant='caption' sx={sx.stock}>
        осталось ? шт
      </Typography>
      <Box sx={{ ...sx.actions, ...sx.deployed }}>
        {/*  TODO: переписать стили */}
        <Docket
          gramValue={productGramValue}
          onSelectGramValue={onSelectGram}
          gramOptions={productGramOptions}
          inCart={productCount !== 0}
          price={price}
          discount={discount}
          isWeightGood={isWeightGood}
          currency={currency}
        />
        <Cart
          // isWeightGood={isWeightGood} // FIXME: выпилить
          currentCount={productCount}
          productGram={productGramValue}
          onAdd={() => onAdd(productGramValue)}
          onRemove={() => onRemove(productGramValue)}
        />
      </Box>
    </Box>
  );
});
