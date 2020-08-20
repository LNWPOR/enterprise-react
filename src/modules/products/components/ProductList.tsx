import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as faker from 'faker';

import * as cartActions from 'modules/cart/actions';
import * as productsActions from '../actions';
import * as selectors from '../selectors';

const ProductList: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectors.getProducts);

  const addProduct = () => {
    dispatch(
      productsActions.addProduct({
        name: faker.lorem.word(),
        desc: faker.lorem.sentence(),
      })
    );
  };

  const addToCart = (id: number) => () => dispatch(cartActions.addToCart(id));

  const removeProduct = (id: number) => () => {
    dispatch(productsActions.removeProduct(id));
  };

  return (
    <div>
      <h2>Products</h2>
      <button onClick={addProduct}>Add new product</button>
      <hr />
      {products.map(({ id, name, desc }) => (
        <div key={id}>
          <div>{name}</div>
          <div>{desc}</div>
          <button onClick={removeProduct(id)}>Remove</button>
          <button onClick={addToCart(id)}>Add to Cart</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
