import React, { useMemo, useRef, useState } from 'react';

import { LinearProgress, SxProps } from '@mui/material';

import { useGetCategoryListQuery } from 'store/api/categoryApi';
import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import {
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
  useGetFavoriteProductsQuery,
} from 'store/api/favoriteApi';
import { useGetProductQuery } from 'store/api/productApi';
import { useCreateProductGradeMutation, useGetProductGradeListQuery } from 'store/api/productGradeApi';
import { addBasketProduct, subtractBasketProduct } from 'store/slices/orderSlice';

import { PrivateLayout } from 'layouts/Private/Private';
import { ShopLayout } from 'layouts/Shop/Shop';

import { CommentCreateBlock } from 'components/Comment/CreateBlock/CreateBlock';
import { useAppNavigation } from 'components/Navigation';
import { ProductActions } from 'components/Product/Actions/Actions';
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
import { ProductInformation } from 'components/Product/Information/Information';
import { ReviewModal } from 'components/Product/ReviewModal/ReviewModal';
import { ProductReviews, Review } from 'components/Product/Reviews/Reviews';
import { Box } from 'components/UI/Box/Box';
import { ImageSlider } from 'components/UI/ImageSlider/ImageSlider';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { CommentDto } from 'types/dto/comment.dto';
import { IProduct } from 'types/entities/IProduct';
import { NotificationType } from 'types/entities/Notification';

import { useAppDispatch } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { dispatchNotification } from 'packages/EventBus';
import { computeProductsWithCategories } from 'utils/catalogUtil';
import { getProductBackground, getProductTypeLabel } from 'utils/categoryUtil';
import { getErrorMessage } from 'utils/errorUtil';

import HeartIcon from '@mui/icons-material/Favorite';
import { noExistingId } from 'constants/default';
import { isProductFavorite } from 'pages/favorites/favoritesHelper';

import translations from './Product.i18n.json';
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
  const { data: categories = [], isLoading: isCategoriesLoading } = useGetCategoryListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();

  const addToBasket = (product: IProduct, gram: number) => dispatch(addBasketProduct({ gram, product }));

  const removeFromBasket = (product: IProduct, gram: number) => dispatch(subtractBasketProduct({ product, gram }));

  const productId = Number(queryId) || 0;

  const {
    data: product,
    isLoading: isProductLoading,
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

  const isLoading = isProductLoading || isCategoriesLoading;

  const productType = useMemo(
    () => product?.categories && categories && getProductTypeLabel(categories, product.categories),
    [product, categories],
  );

  const [reviewForModal, setReviewForModal] = useState<Review>({
    id: noExistingId,
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

  const [fetchCreateProductGrade] = useCreateProductGradeMutation();

  const { data: comments = [] } = useGetProductGradeListQuery(
    { productId, withComments: true, isApproved: true },
    { skip: !productId },
  );

  const formattedSimilarProducts = useMemo(
    () =>
      product?.similarProducts && computeProductsWithCategories(product?.similarProducts, categories, favoriteProducts),
    [product?.similarProducts, categories, favoriteProducts],
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
      label: lowCategory.parentCategories?.[0]?.title.ru || 'Тип товара',
      value: lowCategory.title.ru,
    })) || [];

  const productDescription = product?.description[language] || '';

  const isCurrentProductElected = isProductFavorite(productId, favoriteProducts);

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
              <Box sx={sx.preview}>
                <ImageSlider
                  images={product.images}
                  backgroundSrc={categories && getProductBackground(categories, product.categories || [])}
                  sx={sx.imageSlider}
                />

                <HeartIcon
                  sx={{ ...sx.heart, ...(isCurrentProductElected && sx.elected) } as SxProps}
                  onClick={() => electProduct(product.id, isCurrentProductElected)}
                />
              </Box>

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
                  id={product.id}
                  moyskladId={product.moyskladId}
                  currentUserCity={currentUser?.city.name.ru}
                  price={product.price[currency] || 0}
                  currency={currency}
                  discount={product.discount}
                  productType={productType!}
                  sx={sx.actions}
                  onAdd={(gram: number) => addToBasket(product, gram)}
                  onRemove={(gram: number) => removeFromBasket(product, gram)}
                  onElect={() => electProduct(product.id, isCurrentProductElected)}
                  isElect={isCurrentProductElected}
                />
              </Box>
            </Box>

            {productDescription && (
              <Box sx={sx.description}>
                <Typography sx={sx.title} variant='h5'>
                  {t('description')}
                </Typography>

                <div dangerouslySetInnerHTML={{ __html: productDescription }} />
              </Box>
            )}

            {!!formattedSimilarProducts?.length && (
              <ProductCatalog
                title={t('similar')}
                products={formattedSimilarProducts}
                language={language}
                currency={currency}
                sx={sx.similar}
                categories={categories}
                onAdd={addToBasket}
                onRemove={removeFromBasket}
                onElect={electProduct}
                onDetail={goToProductPage}
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
