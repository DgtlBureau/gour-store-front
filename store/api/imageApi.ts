import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../../http/baseQuery';
import { IImage } from '../../@types/entities/IImage';

export const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: baseQueryWithReauth,
  endpoints(builder) {
    return {
      createImage: builder.mutation<IImage, FormData>({
        query(image) {
          return {
            method: 'POST',
            url: `images/upload`,
            body: image,
          };
        },
      }),
    };
  },
});

export const { useCreateImageMutation } = imageApi;
