import React from 'react';

import Error from '../Error/Error';

const NotMatch: React.FC = () => (
  <Error code={404} description={`Bad URL path: "${window.location.href}"`}/>
);

export default NotMatch;