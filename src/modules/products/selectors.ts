import { RootState } from 'modules/reducers';
import { ProductsState } from './types';

export function getProducts(state: RootState): ProductsState {
  return state.products;
}

export function getProductsByIds(
  state: RootState,
  productIds: number[]
): ProductsState {
  return getProducts(state).filter((product) =>
    productIds.includes(product.id)
  );
}
