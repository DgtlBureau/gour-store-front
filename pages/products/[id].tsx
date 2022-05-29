import { LinearProgress, Stack } from '@mui/material';
import { IProduct } from '../../@types/entities/IProduct';
import { CardSlider } from 'components/CardSlider/CardSlider';
import { CreateCommentBlock } from 'components/CreateCommentBlock/CreateCommentBlock';
import { ProductActions } from 'components/Product/Actions/Actions';
import { ProductCard } from 'components/Product/Card/Card';
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
import {
  useCreateProductGradeMutation,
  useGetProductGradeListQuery,
} from 'store/api/productGradeApi';
import {
  addBasketProduct,
  productsInBasketCount,
  subtractBasketProduct,
} from 'store/slices/orderSlice';

import { ShopLayout } from '../../layouts/Shop/Shop';
import { CHARACTERISTICS } from 'constants/characteristics';
import { Currency } from '../../@types/entities/Currency';

import { sx } from './[id].styles';

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

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
  const currency: Currency = 'rub';

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
        clientName: grade.client?.role?.title || 'Клиент',
        value: grade.value,
        date: new Date(grade.createdAt),
        comment: grade.comment,
      };
    }) || [];

  const similarProductCards =
    product?.similarProducts?.map(similarProduct => {
      const productInBasket = basket.products.find(
        it => it.product.id === similarProduct.id
      );
      const count =
        (product.isWeightGood
          ? productInBasket?.weight
          : productInBasket?.amount) || 0;
      return (
        <ProductCard
          key={similarProduct.id}
          title={similarProduct.title[lang] || ''}
          description={similarProduct.description[lang] || ''}
          rating={similarProduct.grade}
          price={similarProduct.price[currency]}
          previewSrc={similarProduct.images[0]?.full || ''}
          inCart={!!productInBasket}
          isElected={false}
          onAdd={() => {
            handleAddProduct(similarProduct);
          }}
          onRemove={() => {
            handleRemoveProduct(similarProduct);
          }}
          onDetail={() => {
            handleDetailProduct(similarProduct.id);
          }}
          onElect={() => {}}
          discount={similarProduct.discount}
          currentCount={count}
          isWeightGood={similarProduct.isWeightGood}
          currency={currency}
        />
      );
    }) || [];

  const productCharacteristics =
    Object.keys(product?.characteristics || {})
      .filter(key => product?.characteristics[key])
      .map(key => {
        const characteristicValue = CHARACTERISTICS[key]?.values.find(
          value => value.key === product?.characteristics[key]
        );

        return {
          label: CHARACTERISTICS[key]?.label[lang] || '',
          value: characteristicValue?.label[lang] || 'нет информации',
        };
      }) || [];

  return (
    <ShopLayout>
      <>
        {isLoading && <LinearProgress />}
        {!isLoading && isError && (
          <Typography variant="h5">Произошла ошибка</Typography>
        )}
        {!isLoading && !isError && !product && (
          <Typography variant="h5">Продукт не найден</Typography>
        )}
        {!isLoading && !isError && product && (
          <div>
            <Stack direction="row" justifyContent="space-between">
              <Box sx={sx.imageSlider}>
                <ImageSlider images={product.images} />
              </Box>
              <Stack width="100%">
                <Typography variant="h3" sx={sx.productTitle}>
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

            <Typography sx={sx.descriptionTitle} variant="h5">
              Описание товара
            </Typography>
            <Typography sx={sx.description} variant="body1">
              {product.description[lang] || ''}
            </Typography>

            {similarProductCards.length !== 0 && (
              <CardSlider
                title="Похожие товары"
                cardsList={similarProductCards}
                slidesPerView={4}
                spaceBetween={0}
              />
            )}

            <ProductReviews
              sx={sx.reviews}
              reviews={productComments}
            />

            <CreateCommentBlock onCreate={onCreateComment} />
          </div>
        )}
      </>
    </ShopLayout>
  );
}
