import reducer from './reducer';
import { CartActionTypes } from './types';

describe('Cart Reducer', () => {
  it('returns initial state correctly', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual([]);
  });

  describe('ADD_TO_CART', () => {
    it('adds product id to empty state correctly', () => {
      const id = 1;

      expect(
        reducer([], { type: CartActionTypes.ADD_TO_CART, payload: { id } })
      ).toEqual([id]);
    });

    it('adds product id to existing state correctly', () => {
      const id = 1;

      expect(
        reducer([2], { type: CartActionTypes.ADD_TO_CART, payload: { id } })
      ).toEqual([2, id]);
    });
  });

  describe('REMOVE_FROM_CART', () => {
    it('removes product id from existing state correctly', () => {
      expect(
        reducer([1, 2, 3], {
          type: CartActionTypes.REMOVE_FROM_CART,
          payload: { id: 1 },
        })
      ).toEqual([2, 3]);

      expect(
        reducer([1, 2, 3], {
          type: CartActionTypes.REMOVE_FROM_CART,
          payload: { id: 2 },
        })
      ).toEqual([1, 3]);

      expect(
        reducer([1, 2, 3], {
          type: CartActionTypes.REMOVE_FROM_CART,
          payload: { id: 3 },
        })
      ).toEqual([1, 2]);
    });
  });
});
