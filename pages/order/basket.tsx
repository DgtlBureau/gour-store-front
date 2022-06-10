import React from 'react';
import { CartCard } from '../../components/Cart/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBasketProduct,
  selectedProductCount,
  selectedProductSum,
  selectedProductWeight,
  selectProductsInOrder,
  subtractBasketProduct,
} from '../../store/slices/orderSlice';
import { Button } from '../../components/UI/Button/Button';
import s from './basket.module.scss';
import { CartInfo } from '../../components/Cart/Info/Info';
import {ShopLayout} from "../../layouts/Shop/Shop";

export type basketProps = {};

export function Basket({}: basketProps) {
  const dispatch = useDispatch();
  const productsInOrder = useSelector(selectProductsInOrder);
  const count = useSelector(selectedProductCount);

  const weight = useSelector(selectedProductWeight);
  const sum = useSelector(selectedProductSum);

  return (
    <ShopLayout language="ru" currency="cheeseCoin">
      <div>
        <h2>Корзина</h2>
        <div className={s.basket}>
          <div className={s.cards}>
            {productsInOrder.map(it => (
              <CartCard
                key={it.product.id}
                title={it.product.title?.ru || '...'}
                price={it.product.price?.cheeseCoin || 0}
                amount={it.amount}
                weight={it.weight}
                isWeightGood={true}
                productImg={it.product.images[0]?.small}
                discount={10}
                onElect={() => {
                  dispatch(addBasketProduct(it.product));
                }}
                onDelete={() => {
                  dispatch(subtractBasketProduct(it.product));
                }}
                onAdd={() => {
                  dispatch(addBasketProduct(it.product));
                }}
                onSubtract={() => {
                  dispatch(subtractBasketProduct(it.product));
                }}
              />
            ))}
          </div>
          <div>
            <Button>Перейти к оформлению</Button>
            <CartInfo
              count={count}
              weight={weight / 1000}
              price={sum}
              delivery={500}
              discount={10}
            />
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}

export default Basket;
