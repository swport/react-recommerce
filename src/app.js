// bootstrap and custom
import './styles/styles.scss';

import 'bootstrap/dist/js/bootstrap.min.js';

import React, { Suspense } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';

import { SimpleLayout } from './container/Layouts';

import LayoutProvider from './context/LayoutContext';
import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';

import ProviderComposer from './context/composer';

import Routes from './router';

import Loader from './components/Loader';

// mock server
import './mock';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProviderComposer components={
        [BrowserRouter, AuthProvider, LayoutProvider, CartProvider, SimpleLayout]
      }>
        <Suspense fallback={<Loader />}>
          <Routes />
        </Suspense>
      </ProviderComposer>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
