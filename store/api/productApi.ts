import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReauth} from "../../http/baseQuery";

type Product = {
    id: number;
}

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Product'],
    endpoints(builder) {
        return {
            getProductList: builder.query<Product[], void>({
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
            getProduct: builder.query<Product, number>({
                query(id) {
                    return {
                        method: 'get',
                        url: `products/${id}`,
                    }
                },
                providesTags: (result, error, id) => [{ type: 'Product', id }],
            }),
            createProduct: builder.mutation<Product, Partial<Product>>({
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
            updateProduct: builder.mutation<Product, Partial<Product> & Pick<Product, 'id'>>({
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
            deleteProduct: builder.mutation<Product, number>({
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
    useUpdateProductMutation
} = productApi