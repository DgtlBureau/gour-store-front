import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReauth} from "../../http/baseQuery";
import {IPromotion} from "../../@types/entities/IPromotion";

export const promotionApi = createApi({
    reducerPath: 'promotionApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Promotion'],
    endpoints(builder) {
        return {
            getPromotionList: builder.query<IPromotion[], void>({
                query() {
                    return {
                        method: 'get',
                        url: 'promotions',
                    }
                },
                providesTags: (result) =>
                    result ? [
                        ...result.map(({id}) => ({type: 'Promotion', id} as const)),
                        {type: 'Promotion', id: 'LIST'},
                    ] : [{type: 'Promotion', id: 'LIST'}],
            }),
            getPromotion: builder.query<IPromotion, number>({
                query(id) {
                    return {
                        method: 'get',
                        url: `promotions/${id}`,
                    }
                },
                providesTags: (result, error, id) => [{ type: 'Promotion', id }],
            }),
            createPromotion: builder.mutation<IPromotion, Partial<IPromotion>>({
                query(promotion) {
                    return {
                        method: 'post',
                        url: `promotions`,
                        data: promotion
                    }
                },
                invalidatesTags: [
                    { type: 'Promotion', id: 'LIST' },
                ],
            }),
            updatePromotion: builder.mutation<IPromotion, Partial<IPromotion> & Pick<IPromotion, 'id'>>({
                query(promotion) {
                    return {
                        method: 'put',
                        url: `promotions/${promotion.id}`,
                        data: promotion
                    }
                },
                invalidatesTags: (r,e,{id}) => [
                    { type: 'Promotion', id },
                ],
            }),
            deletePromotion: builder.mutation<IPromotion, number>({
                query(id) {
                    return {
                        method: 'delete',
                        url: `promotions/${id}`,
                    }
                },
                invalidatesTags: [
                    { type: 'Promotion', id: 'LIST' },
                ],
            })
        }
    }
})


export const {
    useCreatePromotionMutation,
    useDeletePromotionMutation,
    useGetPromotionQuery,
    useGetPromotionListQuery,
    useLazyGetPromotionQuery,
    useUpdatePromotionMutation
} = promotionApi