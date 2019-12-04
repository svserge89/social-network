import React from 'react';
import {Container} from 'react-bootstrap';
import cn from 'classnames';

import style from './Layout.module.css';

const Layout = ({children, className}) => (
  <Container className={cn(style.container, className)}>{children}</Container>
);

export default Layout;