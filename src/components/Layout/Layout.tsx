import React from 'react';
import {Container} from 'react-bootstrap';
import cn from 'classnames';

import {LayoutProps} from './types';

import style from './Layout.module.css';

const Layout: React.FC<LayoutProps> = ({children, className}) => (
  <Container className={cn(style.container, className)}>{children}</Container>
);

export default Layout;
