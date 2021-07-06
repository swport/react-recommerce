import React from 'react';
import ProductProvider from '../../context/ProductContext';

import ProductListing from './product-listing';

export default function ShopPage() {

    return (
        <ProductProvider>
            <ProductListing />
        </ProductProvider>
    );
}