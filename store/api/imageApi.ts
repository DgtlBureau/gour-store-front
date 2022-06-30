import { commonApi } from './commonApi';
import { IImage } from '../../@types/entities/IImage';
import { Path } from '../../constants/routes';

export const imageApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      createImage: builder.mutation<IImage, FormData>({
        query(image) {
          return {
            method: 'POST',
            url: `${Path.IMAGES}/${Path.UPLOAD}`,
            body: image,
          };
        },
      }),
    };
  },
});

export const { useCreateImageMutation } = imageApi;
