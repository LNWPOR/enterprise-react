import { ProductsActions } from './products/types';
import { CartActions } from './cart/types';

type BaseAction = {
  type: '@@INIT';
};

export type RootActions = ProductsActions | CartActions | BaseAction;
