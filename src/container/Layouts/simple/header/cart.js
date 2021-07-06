import React, { useContext } from 'react';
import { CartContext } from '../../../../context/CartContext';
import CartItem from './cart-item';

export default function Cart() {
    const { items, totalItems } = useContext(CartContext);

    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title font-weight-bold" id="offcanvasCartLabel">
                    Cart Items <span className="text-sm">({totalItems})</span>
                </h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">

                {items.length > 0 ? (
                    items.map(item => <CartItem key={item.id} product={item} />)
                ): (
                    <b>You have no items in your cart</b>
                )}

            </div>
        </div>
    );
}
