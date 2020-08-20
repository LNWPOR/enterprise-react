import {
  AddtoCartAction,
  CartActionTypes,
  RemoveFromCartAction,
} from './types';

export function addToCart(id: number): AddtoCartAction {
  return {
    type: CartActionTypes.ADD_TO_CART,
    payload: {
      id,
    },
  };
}

export function removeFromCart(id: number): RemoveFromCartAction {
  return {
    type: CartActionTypes.REMOVE_FROM_CART,
    payload: {
      id,
    },
  };
}
