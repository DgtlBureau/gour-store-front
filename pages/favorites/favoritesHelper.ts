import { IProduct } from '../../@types/entities/IProduct';

export const isProductFavorite = (
  productId: number,
  favoritesList: IProduct[]
) => {
  return !!favoritesList.find(product => product.id === productId);
};
