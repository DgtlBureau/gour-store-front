import { commonApi } from './commonApi';
import { IOrder } from '../../@types/entities/IOrder';
import { CreateOrderDto } from '../../@types/dto/order/create.dto';
import { Path } from 'constants/routes';

export const orderApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getOrderList: builder.query<IOrder[], void>({
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

export const { useGetOrderListQuery, useCreateOrderMutation } = orderApi;
