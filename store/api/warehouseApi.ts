import { GetWarehouseStockDto } from 'types/dto/warehouse/get-stock.dto';
import { IWarehouseStock } from 'types/entities/IWarehouseStock';

import { Path } from 'constants/routes';

import { commonApi } from './commonApi';

export const warehouseApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getStock: builder.query<IWarehouseStock, GetWarehouseStockDto>({
        query(params) {
          return {
            method: 'GET',
            url: `${Path.WAREHOUSE}/${Path.WAREHOUSE_STOCK}`,
            params,
          };
        },
      }),
    };
  },
});

export const { useGetStockQuery } = warehouseApi;
