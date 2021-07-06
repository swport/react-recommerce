import React from 'react';

import Header from './header';
import Footer from './footer';

export default function SimpleLayout({ children }) {
    return (
        <>
            <Header />
            <div className="container">
                {children}
            </div>
            <Footer />
        </>
    )
}
