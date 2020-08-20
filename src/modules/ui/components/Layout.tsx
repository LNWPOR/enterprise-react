import React, { FC } from 'react';

import ProductList from 'modules/products/components/ProductList';
import Cart from 'modules/cart/components/Cart';
import styles from './Layout.module.css';

const Layout: FC = () => {
  return (
    <div className={styles.wrapper}>
      <ProductList></ProductList>
      <Cart></Cart>
    </div>
  );
};

export default Layout;
