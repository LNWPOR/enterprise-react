import * as actions from './actions';
import {
  CartActionTypes,
  AddtoCartAction,
  RemoveFromCartAction,
} from './types';

describe('Cart Actions', () => {
  it('creates an action to add new product to the cart', () => {
    const id = 1;
    const expectedAction: AddtoCartAction = {
      type: CartActionTypes.ADD_TO_CART,
      payload: { id },
    };

    expect(actions.addToCart(id)).toEqual(expectedAction);
  });

  it('creates an action to remove product from the cart', () => {
    const id = 1;
    const expectedAction: RemoveFromCartAction = {
      type: CartActionTypes.REMOVE_FROM_CART,
      payload: { id },
    };

    expect(actions.removeFromCart(id)).toEqual(expectedAction);
  });
});
