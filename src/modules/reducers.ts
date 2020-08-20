import { combineReducers } from 'redux';

import products from 'modules/products/reducer';
import cart from 'modules/cart/reducer';

const rootReducer = combineReducers({
  products,
  cart,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
