export type Product = {
  id: number;
  name: string;
  desc: string;
};

export type ProductsState = Product[];

export enum ProductsActionTypes {
  ADD_PRODUCT = 'app/products/ADD_PRODUCT',
  REMOVE_PRODUCT = 'app/products/REMOVE_PRODUCT',
}

export type AddProductAction = {
  type: ProductsActionTypes.ADD_PRODUCT;
  payload: {
    product: Product;
  };
};

export type RemoveProductAction = {
  type: ProductsActionTypes.REMOVE_PRODUCT;
  payload: {
    id: number;
  };
};

export type ProductsActions = AddProductAction | RemoveProductAction;
