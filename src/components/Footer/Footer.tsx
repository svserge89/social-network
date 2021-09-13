import React from 'react';

import Layout from '../Layout/Layout';

const Footer: React.FC = () => (
  <footer className="py-2 bg-light">
    <Layout className="px-2 text-end">
      <span className="text-muted">
        Copyright © {new Date().getFullYear()}
        <a className="ps-2" href="https://github.com/svserge89">
          Serge Vorobyov
        </a>
        .
      </span>
    </Layout>
  </footer>
);

export default React.memo(Footer);
