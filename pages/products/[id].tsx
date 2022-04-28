import { LinearProgress, Stack } from '@mui/material';
import { IProduct } from '../../@types/entities/IProduct';
import { CardSlider } from 'components/CardSlider/CardSlider';
import { CreateCommentBlock } from 'components/CreateCommentBlock/CreateCommentBlock';
import { ProductActions } from 'components/Product/Actions/Actions';
import { ProductCard, ProductCardProps } from 'components/Product/Card/Card';
import { ProductInformation } from 'components/Product/Information/Information';
import { ProductReviews } from 'components/Product/Reviews/Reviews';
import { Box } from 'components/UI/Box/Box';
import { ImageSlider } from 'components/UI/ImageSlider/ImageSlider';
import { Typography } from 'components/UI/Typography/Typography';
import { useAppSelector } from 'hooks/store';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductQuery } from 'store/api/productApi';
import translations from './ProductPage.i18n.json';
import {
  useCreateProductGradeMutation,
  useGetProductGradeListQuery,
} from 'store/api/productGradeApi';
import {
  addBasketProduct,
  productsInBasketCount,
  subtractBasketProduct,
} from 'store/slices/orderSlice';

import { ShopLayout } from '../../layouts/ShopLayout';
import { CHARACTERISTICS } from 'constants/characteristics';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { ProductCardSlider } from 'components/CardSlider/Product';

export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useLocalTranslation(translations);

  const dispatch = useDispatch();

  const handleAddProduct = (product: IProduct) => {
    dispatch(addBasketProduct(product));
  };

  const handleRemoveProduct = (product: IProduct) => {
    dispatch(subtractBasketProduct(product));
  };

  const handleDetailProduct = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const lang: 'ru' | 'en' = 'ru';
  const currency: 'rub' | 'usd' | 'eur' = 'rub';

  const productId = id ? +id : 0;

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductQuery(
    {
      id: productId,
      withSimilarProducts: true,
      withMetrics: true,
    },
    { skip: !productId }
  );

  const basket = useAppSelector(state => state.order);

  const count = useAppSelector(state =>
    productsInBasketCount(state, productId, product?.isWeightGood || false)
  );

  const [fetchCreateProductGrade] = useCreateProductGradeMutation();

  const { data: comments = [] } = useGetProductGradeListQuery(
    { productId, withComments: true, isApproved: true },
    { skip: !productId }
  );

  const onCreateComment = (comment: { value: number; comment: string }) => {
    try {
      fetchCreateProductGrade({ productId, ...comment }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const productComments =
    comments.map((grade, i) => {
      return {
        id: grade.id,
        clientName: grade.client?.role?.title || t('client'),
        value: grade.value,
        date: new Date(grade.createdAt),
        comment: grade.comment,
      };
    }) || [];

  const similarProductCardPropsList: ProductCardProps[] =
    product?.similarProducts?.map(similarProduct => {
      const productInBasket = basket.products.find(
        it => it.product.id === similarProduct.id
      );
      const count =
        (product.isWeightGood
          ? productInBasket?.weight
          : productInBasket?.amount) || 0;
      return {
        title: similarProduct.title[lang] || '',
        description: similarProduct.description[lang] || '',
        rating: similarProduct.grade,
        price: similarProduct.price[currency],
        previewSrc: similarProduct.images[0]?.full || '',
        inCart: !!productInBasket,
        isElected: false,
        currency: currency,
        discount: similarProduct.discount,
        currentCount: count,
        isWeightGood: similarProduct.isWeightGood,
        onAdd: () => {
          handleAddProduct(similarProduct);
        },
        onRemove: () => {
          handleRemoveProduct(similarProduct);
        },
        onDetail: () => {
          handleDetailProduct(similarProduct.id);
        },
        onEdit: () => {},
        onElect: () => {},
      };
    }) || [];

  const productCharacteristics =
    Object.keys(product?.characteristics || {})
      .filter(key => product?.characteristics[key])
      .map(key => {
        const characteristicValue = CHARACTERISTICS[key]?.values.find(
          value => value.key === product?.characteristics[key]
        )?.label[lang];
        const characteristicLabel = CHARACTERISTICS[key]?.label[lang];
        // if (!characteristicValue || !characteristicLabel) return;
        return {
          label: characteristicLabel || '',
          value: characteristicValue || '',
        };
      }) || [];

  return (
    <ShopLayout>
      <>
        {isLoading && <LinearProgress />}
        {!isLoading && isError && (
          <Typography variant="h5">{t('errorMessage')}</Typography>
        )}
        {!isLoading && !isError && !product && (
          <Typography variant="h5">{t('notFoundMessage')}</Typography>
        )}
        {!isLoading && !isError && product && (
          <div>
            <Stack direction="row" justifyContent="space-between">
              <Box sx={{ width: '580px', margin: '0 40px 0 0' }}>
                <ImageSlider images={product.images} />
              </Box>
              <Stack width="100%">
                <Typography variant="h3" sx={{ margin: '0 0 35px 0' }}>
                  {product.title[lang] || ''}
                </Typography>
                <ProductInformation
                  rating={product.grade || 0}
                  gradesCount={product.gradesCount || 0}
                  commentsCount={product.commentsCount || 0}
                  characteristics={productCharacteristics}
                  onClickComments={() => {}}
                />
                <ProductActions
                  price={product.price[currency] || 0}
                  count={count}
                  currency={currency}
                  discount={product.discount}
                  isWeightGood={product.isWeightGood}
                  onAddToCart={() => {
                    handleAddProduct(product);
                  }}
                  onRemoveFromCart={() => {
                    handleRemoveProduct(product);
                  }}
                  onAddToFavorite={() => {
                    console.log('add to fav');
                  }}
                />
              </Stack>
            </Stack>

            <Typography sx={{ margin: '100px 0 0 0' }} variant="h5">
              {t('productDescription')}
            </Typography>
            <Typography variant="body1">
              {product.description[lang] || ''}
            </Typography>

            {similarProductCardPropsList.length !== 0 && (
              <ProductCardSlider
                title={t('similarProducts')}
                productCardPropList={similarProductCardPropsList}
              />
            )}

            <ProductReviews
              sx={{ margin: '50px 0' }}
              reviews={productComments}
            />

            <CreateCommentBlock onCreate={onCreateComment} />
          </div>
        )}
      </>
    </ShopLayout>
  );
}
