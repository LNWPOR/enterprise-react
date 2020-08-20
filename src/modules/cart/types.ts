export enum CartActionTypes {
  'ADD_TO_CART' = 'app/cart/ADD_TO_CART',
  'REMOVE_FROM_CART' = 'app/cart/REMOVE_FROM_CART',
}

export type CartState = number[];

export type AddtoCartAction = {
  type: CartActionTypes.ADD_TO_CART;
  payload: {
    id: number;
  };
};

export type RemoveFromCartAction = {
  type: CartActionTypes.REMOVE_FROM_CART;
  payload: {
    id: number;
  };
};

export type CartActions = AddtoCartAction | RemoveFromCartAction;
