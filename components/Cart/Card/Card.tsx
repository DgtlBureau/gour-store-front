import React, { memo, useEffect } from 'react';

import { Card, CardActions, CardContent, CardMedia } from '@mui/material';

import { useLazyGetStockQuery } from 'store/api/warehouseApi';
import { subtractBasketProduct } from 'store/slices/orderSlice';

import { useAppNavigation } from 'components/Navigation';
import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { IProduct } from 'types/entities/IProduct';

import { Path } from 'constants/routes';
import { useAppDispatch } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './Card.i18n.json';
import { CartCardDocket as Docket } from './Docket';

import sx from './Card.styles';

import PlusIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import MinusIcon from '@mui/icons-material/Remove';
import defaultImg from 'assets/images/default.svg';
import { getStockLabel } from '../../Product/Card/Card';

type Props = {
  product: IProduct;
  price: number;
  amount: number;
  gram: number;
  productImg: string;
  backgroundImg?: string;
  discount?: number;
  onAdd: (product: IProduct, gram: number) => void;
  onSubtract: (product: IProduct, gram: number) => void;
  onDelete: (product: IProduct, gram: number) => void;
};

export const CartCard = memo(
  ({
    product,
    price,
    amount,
    gram,
    productImg,
    backgroundImg,
    discount,
    onDelete,
    onAdd,
    onSubtract,
  }: Props) => {
    const { t } = useLocalTranslation(translations);
    const { language } = useAppNavigation();
    const dispatch = useAppDispatch();

    const { id, moyskladId, weight, defaultStock } = product;
    const title = product.title[language];

    const shouldSkipGettingStocks = !gram || !moyskladId;
    const [
        getStockQuery, {
        data: stock,
        isFetching: isStockFetching,
        isError: isStockError
    }
    ] = useLazyGetStockQuery();
    useEffect(() => {
        getStockQuery({
            city: 'Санкт-Петербург',
            gram: String(gram),
            warehouseId: String(moyskladId),
        })
    },[]);

    const someStock: any = Object.keys(stock ?? {}).length ? stock : defaultStock;

    const maxPossibleAmount = weight ? (weight / gram) : someStock?.value;
    useEffect(() => {
      // update product amount with moySlad's stocks
      if (amount > maxPossibleAmount) {
        const subtractCount = amount - maxPossibleAmount;
        dispatch(subtractBasketProduct({ product, gram, count: subtractCount }));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, product, stock]);

    const isAmountMoreThanCost = !isStockFetching && amount >= Number(maxPossibleAmount);
    const isAddDisabled = isStockFetching || (isStockError && !weight) || isAmountMoreThanCost || shouldSkipGettingStocks || (!someStock?.value && !weight);
    const stockLabel = getStockLabel(isStockFetching, isStockError, moyskladId,weight,gram,someStock?.value);

    const screenWidth = window.screen.width;

    const backgroundImage = `url('${backgroundImg}')`;

    const handleAddClick = () => {
      if (!isAddDisabled) {
        onAdd(product, gram);
      }
    };

    const handleDeleteClick = () => onDelete(product, gram);
    const handleSubtractClick = () => onSubtract(product, gram);

    return (
      <Card sx={sx.card}>
        <Link href={`/${Path.PRODUCTS}/${id}`}>
          <CardMedia
            sx={{ ...sx.previewImg, backgroundImage }}
            component='img'
            image={productImg || defaultImg}
            alt=''
          />
        </Link>

        <Box sx={sx.info}>
          <CardContent sx={sx.content}>
            <Box sx={sx.contentTitle}>
              <Link href={`/${Path.PRODUCTS}/${id}`} sx={{ textDecoration: 'none', userSelect: 'none' }}>
                <Typography variant='h6' sx={sx.title}>
                  {title}
                </Typography>
              </Link>

              {screenWidth > 600 ? (
                <Docket discount={discount} price={price} amount={amount} />
              ) : (
                <IconButton size='small' onClick={handleDeleteClick} sx={sx.cancelBtn}>
                  <CancelIcon />
                </IconButton>
              )}
            </Box>
            <Typography variant='body2' color='primary'>
              {gram} грам
            </Typography>
            {!isStockFetching &&  (
              <Typography variant='body2' color='primary'>
                  {stockLabel}
              </Typography>
            )}
          </CardContent>

          <CardActions sx={sx.actions}>
            <Button variant='text' onClick={handleDeleteClick} sx={sx.deleteBtn}>
              {t('delete')}
            </Button>

            <Box sx={sx.edit}>
              <IconButton onClick={handleSubtractClick} disabled={amount === 1}>
                <MinusIcon />
              </IconButton>

              <Typography variant='body2' sx={sx.weight}>
                {amount * gram} {t('g')}
              </Typography>

              <IconButton onClick={handleAddClick} disabled={isAddDisabled}>
                <PlusIcon />
              </IconButton>
            </Box>

            {screenWidth <= 600 && <Docket discount={discount} price={price} amount={amount} />}
          </CardActions>
        </Box>
      </Card>
    );
  },
);
