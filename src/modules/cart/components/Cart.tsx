import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';

const Cart: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectors.getCartProducts);

  const remove = (id: number) => () => dispatch(actions.removeFromCart(id));

  return (
    <div>
      <h2>Cart</h2>
      {products.map(({ id, name, desc }) => (
        <div key={id}>
          <div>{name}</div>
          <div>{desc}</div>
          <button onClick={remove(id)}>Remove</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Cart;
