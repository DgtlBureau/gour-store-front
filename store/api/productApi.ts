import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReauth} from "../../http/baseQuery";
import {IProduct} from "../../@types/entities/IProduct";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Product'],
    endpoints(builder) {
        return {
            getProductList: builder.query<IProduct[], void>({
                query() {
                    return {
                        method: 'get',
                        url: 'products',
                    }
                },
                providesTags: (result) =>
                    result ? [
                        ...result.map(({id}) => ({type: 'Product', id} as const)),
                        {type: 'Product', id: 'LIST'},
                    ] : [{type: 'Product', id: 'LIST'}],
            }),
            getNoveltiesProductList: builder.query<IProduct[], void>({
                query() {
                    return {
                        method: 'get',
                        url: 'products/novelties',
                    }
                },
                providesTags: (result) =>
                    result ? [
                        ...result.map(({id}) => ({type: 'Product', id} as const)),
                        {type: 'Product', id: 'LIST'},
                    ] : [{type: 'Product', id: 'LIST'}],
            }),
            getProduct: builder.query<IProduct, number>({
                query(id) {
                    return {
                        method: 'get',
                        url: `products/${id}`,
                    }
                },
                providesTags: (result, error, id) => [{ type: 'Product', id }],
            }),
            createProduct: builder.mutation<IProduct, Partial<IProduct>>({
                query(product) {
                    return {
                        method: 'post',
                        url: `products`,
                        data: product
                    }
                },
                invalidatesTags: [
                    { type: 'Product', id: 'LIST' },
                ],
            }),
            updateProduct: builder.mutation<IProduct, Partial<IProduct> & Pick<IProduct, 'id'>>({
                query(product) {
                    return {
                        method: 'put',
                        url: `products/${product.id}`,
                        data: product
                    }
                },
                invalidatesTags: (r,e,{id}) => [
                    { type: 'Product', id },
                ],
            }),
            deleteProduct: builder.mutation<IProduct, number>({
                query(id) {
                    return {
                        method: 'delete',
                        url: `products/${id}`,
                    }
                },
                invalidatesTags: [
                    { type: 'Product', id: 'LIST' },
                ],
            })
        }
    }
})


export const {
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetProductQuery,
    useGetProductListQuery,
    useLazyGetProductQuery,
    useUpdateProductMutation,
    useGetNoveltiesProductListQuery
} = productApi