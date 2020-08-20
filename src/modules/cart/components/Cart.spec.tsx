import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import configureMockStore from 'store/configureMockStore';
import { Product } from 'modules/products/types';
import Cart from './Cart';
import { CartActionTypes } from '../types';

describe('Cart', () => {
  const products: Product[] = [
    { id: 1, name: 'Product#1', desc: 'Product Desc#1' },
    { id: 2, name: 'Product#2', desc: 'Product Desc#2' },
    { id: 3, name: 'Product#3', desc: 'Product Desc#3' },
    { id: 4, name: 'Product#4', desc: 'Product Desc#4' },
    { id: 5, name: 'Product#5', desc: 'Product Desc#5' },
  ];
  const productIds = [1, 2];
  const selectedProducts = products.filter((product) =>
    productIds.includes(product.id)
  );

  it('renders cart items correctly', () => {
    const store = configureMockStore({ products, cart: productIds });
    const wrapper = mount(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(wrapper.exists('h2[children="Cart"]')).toBe(true);

    for (const product of selectedProducts) {
      expect(wrapper.text().includes(product.name)).toBe(true);
      expect(wrapper.text().includes(product.desc)).toBe(true);
    }
  });

  it('removes product id from the cart correctly', () => {
    const store = configureMockStore({ products, cart: productIds });
    const wrapper = mount(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    const button = wrapper.find('button').at(0);

    button.simulate('click');

    expect(store.getActions()).toEqual([
      { type: CartActionTypes.REMOVE_FROM_CART, payload: { id: 1 } },
    ]);
  });
});
