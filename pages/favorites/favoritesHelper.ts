import { IProduct } from '../../@types/entities/IProduct';

export const isProductFavorite = (
  productId: number,
  favoritesList: IProduct[]
) => {
  if (!favoritesList) return false;
  return !!favoritesList.find(product => product.id === productId);
};
