import {
  Product,
  ProductsActionTypes,
  AddProductAction,
  RemoveProductAction,
} from './types';

export function addProduct(product: Omit<Product, 'id'>): AddProductAction {
  return {
    type: ProductsActionTypes.ADD_PRODUCT,
    payload: {
      product: { id: +new Date(), ...product },
    },
  };
}

export function removeProduct(id: number): RemoveProductAction {
  return {
    type: ProductsActionTypes.REMOVE_PRODUCT,
    payload: {
      id,
    },
  };
}
