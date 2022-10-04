import React, { useRef, useState } from 'react';
import { LinearProgress } from '@mui/material';

import {
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
  useGetFavoriteProductsQuery,
} from 'store/api/favoriteApi';
import { useGetCategoryListQuery } from 'store/api/categoryApi';
import { getProductBackground } from 'helpers/categoryHelper';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { useGetProductQuery } from 'store/api/productApi';
import { useCreateProductGradeMutation, useGetProductGradeListQuery } from 'store/api/productGradeApi';
import { addBasketProduct, productsInBasketCount, subtractBasketProduct } from 'store/slices/orderSlice';
import { dispatchNotification } from 'packages/EventBus';
import { NotificationType } from 'types/entities/Notification';
import { IProduct } from 'types/entities/IProduct';
import { CommentDto } from 'types/dto/comment.dto';
import { ShopLayout } from 'layouts/Shop/Shop';
import { PrivateLayout } from 'layouts/Private/Private';
import { CommentCreateBlock } from 'components/Comment/CreateBlock/CreateBlock';
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
import { ProductActions } from 'components/Product/Actions/Actions';
import { ProductInformation } from 'components/Product/Information/Information';
import { ProductReviews, Review } from 'components/Product/Reviews/Reviews';
import { Box } from 'components/UI/Box/Box';
import { ImageSlider } from 'components/UI/ImageSlider/ImageSlider';
import { Typography } from 'components/UI/Typography/Typography';
import { useAppNavigation } from 'components/Navigation';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { isProductFavorite } from 'pages/favorites/favoritesHelper';
import translations from './Product.i18n.json';
import { getErrorMessage } from 'utils/errorUtil';
import { ReviewModal } from 'components/Product/ReviewModal/ReviewModal';

import sx from './Product.styles';

export default function Product() {
  const { t } = useLocalTranslation(translations);
  const {
    goToProductPage,
    language,
    currency,
    query: { id: queryId },
  } = useAppNavigation();

  const dispatch = useAppDispatch();

  const commentBlockRef = useRef<HTMLDivElement>(null);

  const { data: favoriteProducts = [] } = useGetFavoriteProductsQuery();
  const { data: categories = [] } = useGetCategoryListQuery();

  const addToBasket = (product: IProduct) => dispatch(addBasketProduct(product));

  const removeFromBasket = (product: IProduct) => dispatch(subtractBasketProduct(product));

  const productId = queryId ? +queryId : 0;

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
      withCategories: true,
    },
    { skip: !productId },
  );

  const [reviewForModal, setReviewForModal] = useState<Review>({
    id: -1,
    clientName: '',
    value: 0,
    comment: '',
    date: new Date(),
  });
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);

  const [removeFavorite] = useDeleteFavoriteProductMutation();
  const [addFavorite] = useCreateFavoriteProductsMutation();

  const electProduct = async (id: number, isElect: boolean) => {
    try {
      if (isElect) {
        await removeFavorite(id);
      } else {
        await addFavorite(id);
      }
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const basket = useAppSelector(state => state.order);

  const count = useAppSelector(state => productsInBasketCount(state, productId, product?.isWeightGood || false));

  const [fetchCreateProductGrade] = useCreateProductGradeMutation();

  const { data: comments = [] } = useGetProductGradeListQuery(
    { productId, withComments: true, isApproved: true },
    { skip: !productId },
  );

  const onCreateComment = (comment: CommentDto) => fetchCreateProductGrade({ productId, ...comment }).unwrap();

  const onClickComments = () => commentBlockRef.current?.scrollIntoView({ behavior: 'smooth' });

  const openReviewModal = (review: Review) => {
    setReviewForModal(review);
    setReviewModalIsOpen(true);
  };
  const closeReviewModal = () => {
    setReviewModalIsOpen(false);
  };

  const productComments =
    comments.map(grade => ({
      id: grade.id,
      clientName: grade.client?.role?.title || 'Клиент',
      value: grade.value,
      date: new Date(grade.createdAt),
      comment: grade.comment,
    })) || [];

  const productCategories =
    product?.categories?.map(lowCategory => ({
      label: lowCategory.parentCategories[0]?.title.ru || 'Тип товара',
      value: lowCategory.title.ru,
    })) || [];

  return (
    <PrivateLayout>
      <ShopLayout language={language} currency={currency}>
        {isLoading && <LinearProgress />}

        {!isLoading && isError && <Typography variant='h5'>Произошла ошибка</Typography>}

        {!isLoading && !isError && !product && <Typography variant='h5'>Продукт не найден</Typography>}

        {!isLoading && !isError && product && (
          <>
            <Link href='/'>Вернуться на главную</Link>

            <Box sx={sx.top}>
              <ImageSlider
                images={product.images}
                backgroundSrc={categories && getProductBackground(categories, product.categories)}
                sx={sx.imageSlider}
              />

              <Box sx={sx.info}>
                <Typography variant='h3' sx={sx.title}>
                  {product.title[language] || ''}
                </Typography>

                <ProductInformation
                  rating={product.grade || 0}
                  gradesCount={product.gradesCount || 0}
                  commentsCount={product.commentsCount || 0}
                  categories={productCategories}
                  onClickComments={onClickComments}
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
                  onElect={() => electProduct(product.id, isProductFavorite(product.id, favoriteProducts))}
                  isElect={isProductFavorite(product.id, favoriteProducts)}
                />
              </Box>
            </Box>

            <Box sx={sx.description}>
              <Typography sx={sx.title} variant='h5'>
                {t('description')}
              </Typography>

              <Typography variant='body1'>{product.description[language] || ''}</Typography>
            </Box>

            {!!product.similarProducts.length && (
              <ProductCatalog
                title={t('similar')}
                products={product.similarProducts}
                basket={basket.products}
                language={language}
                currency={currency}
                sx={sx.similar}
                onAdd={addToBasket}
                onRemove={removeFromBasket}
                onElect={electProduct}
                onDetail={goToProductPage}
                favoritesList={favoriteProducts}
              />
            )}

            {!!productComments.length && (
              <ProductReviews
                sx={sx.reviews}
                reviews={productComments}
                ref={commentBlockRef}
                onReviewClick={openReviewModal}
              />
            )}

            <CommentCreateBlock onCreate={onCreateComment} />
          </>
        )}

        <ReviewModal isOpen={reviewModalIsOpen} review={reviewForModal} onClose={closeReviewModal} />
      </ShopLayout>
    </PrivateLayout>
  );
}
