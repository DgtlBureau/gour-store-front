import { useState } from 'react';
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
import { useDispatch } from 'react-redux';
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
import { LocalConfig } from '../../hooks/useLocalTranslation';
import { IOrderProduct } from '../../@types/entities/IOrderProduct';
import { Currency } from '../../@types/entities/Currency';

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

  const locale: keyof LocalConfig =
    (router?.locale as keyof LocalConfig) || 'ru';
  const currentCurrency = locale === 'ru' ? 'rub' : 'eur';

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

  console.log(comments);

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

  const similarProductCards =
    product?.similarProducts?.map(similarProduct => (
      <SimilarProductCards
        similarProduct={similarProduct}
        basket={basket.products}
        currentCurrency={currentCurrency}
        locale={locale}
        handleAddProduct={() => {
          handleAddProduct(similarProduct);
        }}
        handleRemoveProduct={() => {
          handleRemoveProduct(similarProduct);
        }}
        handleDetailProduct={() => {
          handleDetailProduct(similarProduct.id);
        }}
      />
    )) || [];

  const productCharacteristics =
    Object.keys(product?.characteristics || {})
      .filter(key => product?.characteristics[key])
      .map(key => {
        const characteristicValue = CHARACTERISTICS[key]?.values.find(
          value => value.key === product?.characteristics[key]
        );

        return {
          label: CHARACTERISTICS[key]?.label[locale] || '',
          value: characteristicValue?.label[locale] || 'нет информации',
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
              <Box sx={{ width: '580px', margin: '0 40px 0 0' }}>
                <ImageSlider images={product.images} />
              </Box>
              <Stack width="100%">
                <Typography variant="h3" sx={{ margin: '0 0 35px 0' }}>
                  {product.title[locale] || ''}
                </Typography>
                <ProductInformation
                  rating={product.grade || 0}
                  gradesCount={product.gradesCount || 0}
                  commentsCount={product.commentsCount || 0}
                  characteristics={productCharacteristics}
                  onClickComments={() => {}}
                />
                <ProductActions
                  price={product.price[currentCurrency] || 0}
                  count={count}
                  currency={currentCurrency}
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
              Описание товара
            </Typography>
            <Typography variant="body1">
              {product.description[locale] || ''}
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

type SimilarProductCards = {
  similarProduct: IProduct;
  basket: IOrderProduct[];
  currentCurrency: Currency;
  locale: 'ru' | 'en';
  handleAddProduct: () => void;
  handleRemoveProduct: () => void;
  handleDetailProduct: () => void;
};

const SimilarProductCards = ({
  similarProduct,
  basket,
  locale,
  currentCurrency,
  handleAddProduct,
  handleRemoveProduct,
  handleDetailProduct,
}: SimilarProductCards) => {
  const productInBasket = basket.find(
    it => it.product.id === similarProduct.id
  );
  const count =
    (similarProduct.isWeightGood
      ? productInBasket?.weight
      : productInBasket?.amount) || 0;
  return (
    <ProductCard
      key={similarProduct.id}
      title={similarProduct.title[locale] || ''}
      description={similarProduct.description[locale] || ''}
      rating={similarProduct.grade}
      price={similarProduct.price[currentCurrency]}
      previewSrc={similarProduct.images[0]?.full || ''}
      inCart={!!productInBasket}
      isElected={false}
      onAdd={handleAddProduct}
      onRemove={handleRemoveProduct}
      onDetail={handleDetailProduct}
      onElect={() => {}}
      discount={similarProduct.discount}
      currentCount={count}
      isWeightGood={similarProduct.isWeightGood}
      currency={currentCurrency}
    />
  );
};
