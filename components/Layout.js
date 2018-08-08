import React from 'react';
import { Container } from 'semantic-ui-react'
import Head from 'next/head';

import Header from './Header';

export default ({ children }) => {
  return (
    <Container>
      {/* Next.js doesn't have out of the box support for css modules. Add the CDN to the head tag. */}
      <Head>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
      </Head>
      <Header />
      {children}
    </Container>
  );
};