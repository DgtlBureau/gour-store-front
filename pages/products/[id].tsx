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
  subtractBasketProduct,
} from 'store/slices/orderSlice';

import { ShopLayout } from '../../layouts/ShopLayout';

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

  const lang: 'ru' | 'en' = 'ru';
  const currency = 'rub';

  const productId = id ? +id : 0;

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductQuery(
    { id: productId, withSimilarProducts: true, withGrades: true },
    { skip: !productId }
  );

  const [fetchCreateProductGrade] = useCreateProductGradeMutation();

  const data = useGetProductGradeListQuery(
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

  const characteristics: { label: string; value: string | number }[] =
    Object.keys(product?.characteristics || {}).map(key => ({
      label: key,
      value: product?.characteristics[key] || '',
    }));

  const productComments =
    product?.productGrades?.map((grade, i) => {
      return {
        id: grade.id,
        clientName: grade.client?.role || 'Клиент',
        value: grade.value,
        date: new Date(grade.createdAt),
        comment: grade.comment,
      };
    }) || [];

  const similarProductCards =
    product?.similarProducts?.map(similarProduct => (
      <ProductCard
        title={similarProduct.title[lang] || ''}
        description={similarProduct.description[lang] || ''}
        rating={similarProduct.grade}
        currentWeight={0}
        price={similarProduct.price[currency]}
        currency={currency}
        previewSrc={''}
        inCart={false}
        isElected={false}
        onAdd={() => {}}
        onSubtract={() => {}}
        onRemove={() => {}}
        onEdit={() => {}}
        onElect={() => {}}
        onDetail={() => {}}
      />
    )) || [];

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
                  characteristics={characteristics}
                  onClickComments={() => {}}
                />
                <ProductActions
                  price={product.price[currency] || 0}
                  weight={100}
                  discount={product.discount}
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
              Описание товара
            </Typography>
            <Typography variant="body1">
              {product.description[lang] || ''}
            </Typography>

            {similarProductCards.length !== 0 && (
              <CardSlider
                title="Похожие товары"
                cardsList={similarProductCards}
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
