import { RootActions } from 'modules/actions';
import { CartState, CartActionTypes } from './types';

const initialState: CartState = [];

export default (
  state: CartState = initialState,
  action: RootActions
): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      return Array.from(new Set([...state, action.payload.id]));
    case CartActionTypes.REMOVE_FROM_CART:
      return state.filter((item) => item !== action.payload.id);
    default:
      return state;
  }
};
