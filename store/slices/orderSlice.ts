/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { authApi } from 'store/api/authApi';
import { RootState } from 'store/store';

import { IOrderProduct } from 'types/entities/IOrderProduct';
import { IProduct } from 'types/entities/IProduct';

import { getProductKeyInBasket } from 'pages/personal-area/orders/ordersHelper';

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

export interface BasketState {
  products: Record<string, IOrderProduct>;
  contacts?: OrderFormContacts;
  address?: OrderFormAddress;
}

const initialState: BasketState = {
  products: {},
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addBasketProduct: (state, action: PayloadAction<{ gram: number; product: IProduct }>) => {
      const { gram, product } = action.payload;

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

    subtractBasketProduct: (state, action: PayloadAction<{ gram: number; product: IProduct }>) => {
      const { gram, product } = action.payload;

      const productKey = getProductKeyInBasket(product.id, gram);
      const stateProduct = state.products[productKey];

      if (stateProduct.amount === 1) {
        delete state.products[productKey];
      } else {
        stateProduct.amount--;
      }
    },

    removeProduct: (state, action: PayloadAction<{ gram: number; product: IProduct }>) => {
      const { gram, product } = action.payload;

      const productKey = getProductKeyInBasket(product.id, gram);
      delete state.products[productKey];
    },
  },
  extraReducers(builder) {
    builder.addMatcher(authApi.endpoints.signOut.matchFulfilled, () => initialState);
  },
});

export const selectBasketProducts = (state: RootState) => Object.values(state.order.products);

export const selectedProductCount = (state: RootState) =>
  Object.values(state.order.products).reduce((acc, product) => acc + product.amount, 0);

export const selectedProductSum = (state: RootState) =>
  Object.values(state.order.products).reduce((acc, it) => acc + it.product.price.cheeseCoin * it.amount, 0);

export const selectedProductDiscount = (state: RootState) =>
  Object.values(state.order.products).reduce((acc, it) => {
    const discount = it.product.discount || 0;
    return acc + (it.product.price.cheeseCoin / 100) * discount * it.amount;
  }, 0);

// export const productsInBasketCount = (state: RootState, productId: number, gram: number): number =>
//   state.order.products[getProductKeyInBasket(productId, gram)]?.amount ?? 0;

export const selectProductsIdInOrder = (state: RootState): number[] =>
  Object.values(state.order.products).reduce((acc, item) => [...acc, item.product.id], [] as number[]);

export const { addBasketProduct, subtractBasketProduct, removeProduct } = orderSlice.actions;

export default orderSlice.reducer;
