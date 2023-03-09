/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getProductKeyInBasket } from 'pages/personal-area/orders/ordersHelper';

import { authApi } from 'store/api/authApi';
import { RootState } from 'store/store';

import { IOrderProduct } from 'types/entities/IOrderProduct';
import { IProduct } from 'types/entities/IProduct';

import { getPriceByGrams } from 'utils/currencyUtil';

interface OrderFormContacts {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface OrderFormAddress {
  city: string;
  street: string;
  homeNumber: number;
  apartmentNumber: number;
  entrance: number;
  floor: number;
}

export type BasketProduct = Pick<IOrderProduct, 'amount' | 'product' | 'gram'>;

export interface BasketState {
  products: Record<string, BasketProduct>;
  contacts?: OrderFormContacts;
  address?: OrderFormAddress;
  wasOrderPostponed: boolean
}

const initialState: BasketState = {
  products: {},
  wasOrderPostponed: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addBasketProduct: (state, action: PayloadAction<{ gram: number; product: IProduct }>) => {
      const { gram, product } = action.payload;

      if (!product.id || !gram) {
        // eslint-disable-next-line no-console
        console.error('Отсутствует id или не выбраны граммы');
        return;
      }

      const productKey = getProductKeyInBasket(product.id, gram);
      const stateProduct = state.products[productKey];

      if (stateProduct) {
        stateProduct.amount++;
      } else {
        state.products[productKey] = {
          product,
          amount: 1,
          gram,
        };
      }
    },

    subtractBasketProduct: (state, action: PayloadAction<{ gram: number; product: IProduct; count?: number }>) => {
      const { gram, product, count = 1 } = action.payload;

      const productKey = getProductKeyInBasket(product.id, gram);
      const stateProduct = state.products[productKey];

      if (stateProduct.amount === 1) {
        delete state.products[productKey];
      } else {
        stateProduct.amount -= count;
      }
    },

    removeProduct: (state, action: PayloadAction<{ gram: number; product: IProduct }>) => {
      const { gram, product } = action.payload;

      const productKey = getProductKeyInBasket(product.id, gram);
      delete state.products[productKey];
    },

    setOrderPostponed: (state, action: PayloadAction<boolean>) => {
      state.wasOrderPostponed = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(authApi.endpoints.signOut.matchFulfilled, () => initialState);
  },
});

export const getWasOrderPostponed = (state: RootState) => state.order.wasOrderPostponed;

export const selectBasketProducts = (state: RootState) => Object.values(state.order.products);

export const selectedProductCount = (state: RootState) =>
  Object.values(state.order.products).reduce((acc, product) => acc + product.amount, 0);

export const selectedProductSum = (state: RootState) =>
  Object.values(state.order.products).reduce((acc, it) => {
    const priceByGram = getPriceByGrams(it.product.price.cheeseCoin, it.gram);

    return acc + priceByGram * it.amount;
  }, 0);

export const selectedProductDiscount = (state: RootState) =>
  Object.values(state.order.products).reduce((acc, it) => {
    const discount = it.product.price.cheeseCoin - it.product.totalCost;
    const discountByGram = getPriceByGrams(discount, it.gram);

    return acc + discountByGram * it.amount;
  }, 0);

// export const productsInBasketCount = (state: RootState, productId: number, gram: number): number =>
//   state.order.products[getProductKeyInBasket(productId, gram)]?.amount ?? 0;

export const selectProductsIdInOrder = (state: RootState): number[] =>
  Object.values(state.order.products).reduce((acc, item) => [...acc, item.product.id], [] as number[]);

export const { addBasketProduct, subtractBasketProduct, removeProduct, setOrderPostponed } = orderSlice.actions;

export default orderSlice.reducer;
