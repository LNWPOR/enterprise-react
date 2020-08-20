import { RootState } from 'modules/reducers';
import { CartState } from './types';
import { ProductsState } from 'modules/products/types';
import * as productsSelectors from '../products/selectors';

export function getCart(state: RootState): CartState {
  return state.cart;
}

export function getCartProducts(state: RootState): ProductsState {
  const productIds = getCart(state);

  return productsSelectors.getProductsByIds(state, productIds);
}
