import React, { useContext } from 'react';
import { CartContext } from '../../../../context/CartContext';
import { v_price } from '../../../../utils/helper';

export default function CartItem({ product }) {

    const { imageUrl, name, price, quantity } = product;

    const { addItem, removeItem, itemQtyDecrease } = useContext(CartContext);

    function ChangeCartQty() {
        return (
            <div className="d-flex flex-column align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <button onClick={() => itemQtyDecrease(product.id)} className="rounded-3 btn btn-xs btn-primary fw-bold">
                        -
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => addItem(product)} className="rounded-3 btn btn-xs btn-success fw-bold">
                        +
                    </button>
                </div>
                <a onClick={() => removeItem(product.id)} className="mt-1 btn btn-link text-danger">
                    Remove
                </a>
            </div>
        );
    }

    return (
        <div className="my-2 shadow-sm card flex-fill">
            <div className="card-body d-flex align-items-center">
                <img src={imageUrl} className="img-thumbnail me-2" alt="..." height="65" width="65" />
                <div className="d-flex flex-column align-items-start">
                    <div className="fw-bold">{name}</div>
                    <div className="fw-bold">{v_price(price)}</div>
                </div>
                <div className="ms-auto">
                    <ChangeCartQty />
                </div>
            </div>
        </div>
    )
}
