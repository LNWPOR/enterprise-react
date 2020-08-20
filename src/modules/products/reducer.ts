import { RootActions } from 'modules/actions';
import { ProductsActionTypes, ProductsState } from './types';

const initialState = [
  { id: 1, name: 'Product#1', desc: 'Product Desc#1' },
  { id: 2, name: 'Product#2', desc: 'Product Desc#2' },
  { id: 3, name: 'Product#3', desc: 'Product Desc#3' },
  { id: 4, name: 'Product#4', desc: 'Product Desc#4' },
  { id: 5, name: 'Product#5', desc: 'Product Desc#5' },
];

export default (
  state: ProductsState = initialState,
  action: RootActions
): ProductsState => {
  switch (action.type) {
    case ProductsActionTypes.ADD_PRODUCT:
      return [...state, action.payload.product];
    case ProductsActionTypes.REMOVE_PRODUCT:
      return state.filter((product) => product.id !== action.payload.id);
    default:
      return state;
  }
};
