import { Path } from 'constants/routes';
import { commonApi } from './commonApi';
import { IOrder } from '../../@types/entities/IOrder';
import { CreateOrderDto } from '../../@types/dto/order/create.dto';

export const orderApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getOrdersList: builder.query<IOrder[], void>({
        query() {
          return {
            method: 'GET',
            url: Path.ORDERS,
          };
        },
      }),
      createOrder: builder.mutation<IOrder, CreateOrderDto>({
        query(product) {
          return {
            method: 'POST',
            url: Path.ORDERS,
            body: product,
          };
        },
      }),
    };
  },
});

export const { useGetOrdersListQuery, useCreateOrderMutation } = orderApi;
