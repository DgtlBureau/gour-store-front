import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import {
  addBasketProduct,
  selectProductsIdInOrder,
  selectProductsInOrder,
  subtractBasketProduct,
} from '../store/slices/orderSlice';
import { useAppSelector } from 'hooks/store';
import {
  useGetNoveltiesProductListQuery,
  useGetProductListQuery,
} from '../store/api/productApi';
import { ShopLayout } from '../layouts/ShopLayout';
import { CardSlider } from '../components/CardSlider/CardSlider';
import { ProductCard } from '../components/Product/Card/Card';
import { useGetPromotionListQuery } from '../store/api/promotionApi';
import { PromotionCard } from '../components/PromotionCard/PromotionCard';
import { LocalConfig } from '../@types/entities/LocalConfig';

import s from './index.module.scss';

const Home: NextPage = () => {
  const router = useRouter();
  const basket = useAppSelector(state => state.order);

  const dispatch = useDispatch();

  const { data: products } = useGetProductListQuery();
  const { data: novelties } = useGetNoveltiesProductListQuery();
  const { data: promotions } = useGetPromotionListQuery();
  const currentLanguage = 'ru';
  const currentCurrency = 'rub';
  const locale: keyof LocalConfig =
    (router?.locale as keyof LocalConfig) || 'ru';

  const productsIdInOrder = useSelector(selectProductsIdInOrder);

  if (!products || !promotions || !novelties) {
    return <div />;
  }

  return (
    <ShopLayout>
      <div>
        <div>
          <CardSlider
            title={'Акции и скидки'}
            cardsList={promotions.map(promotion => (
              <PromotionCard
                title={promotion?.title?.ru || 'X'}
                key={promotion.id}
                image={promotion.cardImage.small}
                onMoreClick={() => router.push(`promotions/${promotion.id}`)}
              />
            ))}
          />
        </div>
        <div className={s.infoBlock}>
          <CardSlider
            title="Новинки"
            slidesPerView={4}
            spaceBetween={0}
            rows={1}
            cardsList={novelties.map(product => {
              const productInBasket = basket.products.find(
                it => it.product.id === product.id
              );
              const count =
                (product.isWeightGood
                  ? productInBasket?.weight
                  : productInBasket?.amount) || 0;
              return (
                <ProductCard
                  key={product.id}
                  currency={currentCurrency}
                  title={product.title ? product.title[locale] : ''}
                  description={
                    product.description ? product.description[locale] : ''
                  }
                  rating={product.grade}
                  price={product.price[currentCurrency]}
                  previewSrc={product.images[0] ? product.images[0].small : ''}
                  inCart={productsIdInOrder.includes(product.id)}
                  isElected={false}
                  onAdd={() => {
                    dispatch(addBasketProduct(product));
                  }}
                  onRemove={() => {
                    dispatch(subtractBasketProduct(product));
                  }}
                  onEdit={() => {}}
                  onElect={() => {}}
                  onDetail={() => router.push(`products/${product.id}`)}
                  currentCount={count}
                  isWeightGood={product.isWeightGood}
                />
              );
            })}
          />
        </div>
      </div>
    </ShopLayout>
  );
};

export default Home;
