import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { LinearProgress, Stack } from '@mui/material';

import { useAppSelector } from 'hooks/store';
import { useGetProductQuery } from 'store/api/productApi';
import { useCreateProductGradeMutation, useGetProductGradeListQuery } from 'store/api/productGradeApi';
import { addBasketProduct, productsInBasketCount, subtractBasketProduct } from 'store/slices/orderSlice';
import { ShopLayout } from '../../layouts/Shop/Shop';
import { CardSlider } from 'components/CardSlider/CardSlider';
import { CreateCommentBlock } from 'components/CreateCommentBlock/CreateCommentBlock';
import { ProductActions } from 'components/Product/Actions/Actions';
import { ProductCard } from 'components/Product/Card/Card';
import { ProductInformation } from 'components/Product/Information/Information';
import { ProductReviews } from 'components/Product/Reviews/Reviews';
import { Box } from 'components/UI/Box/Box';
import { ImageSlider } from 'components/UI/ImageSlider/ImageSlider';
import { Typography } from 'components/UI/Typography/Typography';
import { LocalConfig } from 'hooks/useLocalTranslation';
import { IProduct } from '../../@types/entities/IProduct';
import { CHARACTERISTICS } from 'constants/characteristics';

import sx from './products.styles';

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

  const language: keyof LocalConfig =
    (router?.locale as keyof LocalConfig) || 'ru';

  const currency = 'cheeseCoin';

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
          title={similarProduct.title[language] || ''}
          description={similarProduct.description[language] || ''}
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
          label: CHARACTERISTICS[key]?.label[language] || '',
          value: characteristicValue?.label[language] || 'нет информации',
        };
      }) || [];

  return (
    <ShopLayout language={language} currency={currency}>
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
                  {product.title[language] || ''}
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
              {product.description[language] || ''}
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
