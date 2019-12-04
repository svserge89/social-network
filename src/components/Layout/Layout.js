import React from 'react';
import {Container} from 'react-bootstrap';

import style from './Layout.module.css';

const Layout = ({children, className}) => (
  <Container className={className ? `${className} ${style.container}` : style.container}>
    {children}
  </Container>
);

export default Layout;