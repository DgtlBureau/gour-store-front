import { commonApi } from './commonApi';
import { IInvoice, InvoiceStatus } from 'types/entities/IInvoice';
import { updateInvoiceDto } from 'types/dto/invoice/updateInvoice.dto';

const mockData: IInvoice[] = [
  {
    id: 1,
    amount: 3100,
    status: InvoiceStatus.WAITING,
    value: 3100,
    createdAt: '2022-04-19T16:04:16Z',
    updatedAt: '2022-04-19T16:04:16Z',
    expiresAt: '2022-04-19T16:34:16Z',
  },
  {
    id: 2,
    amount: 150000,
    status: InvoiceStatus.PAID,
    value: 150000,
    createdAt: '2021-08-02T20:00:16Z',
    updatedAt: '2021-08-02T20:17:16Z',
    expiresAt: '2021-08-02T20:47:16Z',
  },
  {
    id: 3,
    amount: 1,
    status: InvoiceStatus.CANCELLED,
    value: 1,
    createdAt: '2021-08-02T20:00:16Z',
    updatedAt: '2021-08-02T20:17:16Z',
    expiresAt: '2021-08-02T20:47:16Z',
  },
  {
    id: 4,
    amount: 855354,
    status: InvoiceStatus.FAILED,
    value: 855354,
    createdAt: '2022-08-24T13:23:16Z',
    updatedAt: '2022-08-24T13:23:16Z',
    expiresAt: '2022-08-28T13:53:16Z',
  },
];

export const invoiceApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getInvoiceList: builder.query<IInvoice[], void>({
        // query: async () => ({
        //   url: 'Path.INVOICES',
        // }),
        queryFn: () => ({
          data: mockData,
        }),
        providesTags: result =>
          result
            ? [...result.map(({ id }) => ({ type: 'Invoice', id } as const)), { type: 'Invoice', id: 'LIST' }]
            : [{ type: 'Invoice', id: 'LIST' }],
      }),
      updateInvoice: builder.mutation<IInvoice, updateInvoiceDto>({
        query(body) {
          return {
            method: 'POST',
            url: 'Path.INVOICES',
            body,
          };
        },
        invalidatesTags: [{ type: 'Invoice', id: 'LIST' }],
      }),
    };
  },
});

export const { useGetInvoiceListQuery, useUpdateInvoiceMutation } = invoiceApi;
