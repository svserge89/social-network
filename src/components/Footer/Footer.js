import React from 'react';
import {Container} from 'react-bootstrap';

const Footer = () => (
  <footer className="py-2 bg-light">
    <Container className="px-2">
      <span className="text-muted">
        Copyright © 2020 <a href="https://github.com/svserge89">svserge89</a>.
      </span>
    </Container>
  </footer>
);

export default Footer;