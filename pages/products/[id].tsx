import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { LinearProgress } from '@mui/material';

import translations from './Product.i18n.json';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { useAppSelector } from 'hooks/store';
import { useGetProductQuery } from 'store/api/productApi';
import { useCreateProductGradeMutation, useGetProductGradeListQuery } from 'store/api/productGradeApi';
import { addBasketProduct, productsInBasketCount, subtractBasketProduct } from 'store/slices/orderSlice';
import { ShopLayout } from '../../layouts/Shop/Shop';
import { CommentCreateBlock } from 'components/Comment/CreateBlock/CreateBlock';
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
import { ProductActions } from 'components/Product/Actions/Actions';
import { ProductInformation } from 'components/Product/Information/Information';
import { ProductReviews } from 'components/Product/Reviews/Reviews';
import { Box } from 'components/UI/Box/Box';
import { ImageSlider } from 'components/UI/ImageSlider/ImageSlider';
import { Typography } from 'components/UI/Typography/Typography';
import { LocalConfig } from 'hooks/useLocalTranslation';
import { IProduct } from '../../@types/entities/IProduct';
import { CHARACTERISTICS } from 'constants/characteristics';
import { Path } from '../../constants/routes';

import sx from './Product.styles';
import { PrivateLayout } from 'layouts/Private/Private';
import { eventBus, EventTypes } from 'packages/EventBus';
import { NotificationType } from '../../@types/entities/Notification';
import {
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
  useGetFavoriteProductsQuery,
} from 'store/api/favoriteApi';
import { isProductFavorite } from 'pages/favorites/favoritesHelper';

export default function Product() {
  const { t } = useLocalTranslation(translations);

  const router = useRouter();

  const { id } = router.query;

  const dispatch = useDispatch();

  const { data: favoriteProducts = [] } = useGetFavoriteProductsQuery();

  const addToBasket = (product: IProduct) => dispatch(addBasketProduct(product));

  const removeFromBasket = (product: IProduct) => dispatch(subtractBasketProduct(product));

  const goToProductPage = (productId: number) => router.push(`/${Path.PRODUCTS}/${productId}`);

  const language: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';

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
      withDiscount: true,
    },
    { skip: !productId }
  );

  const [removeFavorite] = useDeleteFavoriteProductMutation();
  const [addFavorite] = useCreateFavoriteProductsMutation();

  const handleElect = async (id: number, isElect: boolean) => {
    if (isElect) {
      try {
        await removeFavorite(id);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await addFavorite({ productId: id });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const basket = useAppSelector(state => state.order);

  const count = useAppSelector(state => productsInBasketCount(state, productId, product?.isWeightGood || false));

  const [fetchCreateProductGrade] = useCreateProductGradeMutation();

  const { data: comments = [] } = useGetProductGradeListQuery(
    { productId, withComments: true, isApproved: true },
    { skip: !productId }
  );

  const onCreateComment = async (comment: { value: number; comment: string }) => {
    try {
      await fetchCreateProductGrade({ productId, ...comment }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Комментарий создан',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка создания комментария',
        type: NotificationType.DANGER,
      });
    }
  };

  const productComments =
    comments.map(grade => {
      return {
        id: grade.id,
        clientName: grade.client?.role?.title || 'Клиент',
        value: grade.value,
        date: new Date(grade.createdAt),
        comment: grade.comment,
      };
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
    <PrivateLayout>
      <ShopLayout language={language} currency={currency}>
        {isLoading && <LinearProgress />}

        {!isLoading && isError && <Typography variant="h5">Произошла ошибка</Typography>}

        {!isLoading && !isError && !product && <Typography variant="h5">Продукт не найден</Typography>}

        {!isLoading && !isError && product && (
          <>
            <Box sx={sx.top}>
              <ImageSlider images={product.images} sx={sx.imageSlider} />

              <Box sx={sx.info}>
                <Typography variant="h3" sx={sx.title}>
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
                  sx={sx.actions}
                  onAdd={() => addToBasket(product)}
                  onRemove={() => removeFromBasket(product)}
                  onElect={() => {
                    handleElect(product.id, isProductFavorite(product.id, favoriteProducts));
                  }}
                  isElect={isProductFavorite(product.id, favoriteProducts)}
                />
              </Box>
            </Box>

            <Box sx={sx.description}>
              <Typography sx={sx.title} variant="h5">
                {t('description')}
              </Typography>

              <Typography variant="body1">{product.description[language] || ''}</Typography>
            </Box>

            {!!product.similarProducts && (
              <ProductCatalog
                title={t('similar')}
                products={product.similarProducts}
                basket={basket.products}
                language={language}
                currency={currency}
                sx={sx.similar}
                onAdd={addToBasket}
                onRemove={removeFromBasket}
                onElect={handleElect}
                onDetail={goToProductPage}
                favoritesList={favoriteProducts}
              />
            )}

            {productComments.length !== 0 && <ProductReviews sx={sx.reviews} reviews={productComments} />}

            <CommentCreateBlock onCreate={onCreateComment} />
          </>
        )}
      </ShopLayout>
    </PrivateLayout>
  );
}
