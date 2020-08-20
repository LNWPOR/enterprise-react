import * as selectors from './selectors';
import { Product } from 'modules/products/types';

describe('Cart Selectors', () => {
  describe('getCart', () => {
    it('returns product ids correctly', () => {
      const productIds = [1, 2, 3];

      expect(selectors.getCart({ cart: productIds, products: [] })).toEqual(
        productIds
      );
    });
  });

  describe('getCartProducts', () => {
    it('returns product items correctly', () => {
      const products: Product[] = [
        { id: 1, name: 'Product#1', desc: 'Product Desc#1' },
        { id: 2, name: 'Product#2', desc: 'Product Desc#2' },
        { id: 3, name: 'Product#3', desc: 'Product Desc#3' },
        { id: 4, name: 'Product#4', desc: 'Product Desc#4' },
        { id: 5, name: 'Product#5', desc: 'Product Desc#5' },
      ];
      const productIds = [1, 2];

      expect(selectors.getCartProducts({ products, cart: productIds })).toEqual(
        products.filter((product) => productIds.includes(product.id))
      );
    });
  });
});
