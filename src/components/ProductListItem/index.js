import React from 'react';
import { v_price } from '../../utils/helper';

export default function ProductListItem({ product, addItem, itemQtyDecrease, items }) {
    const { imageUrl, name, price } = product;

    function AddToCartBtn() {
        const alreadyAdded = items.find(el => el.id === product.id);
        
        if (alreadyAdded) {
            return (
                <div className="d-flex align-items-center gap-2">
                    <button onClick={() => itemQtyDecrease(product.id)} className="rounded-3 btn btn-xs btn-secondary">
                        -
                    </button>
                    <span>{alreadyAdded.quantity}</span>
                    <button onClick={() => addItem(product)} className="rounded-3 btn btn-xs btn-success">
                        +
                    </button>
                </div>
            );
        }

        return (
            <button onClick={() => addItem(product)} className="btn btn-md btn-success fw-bold">
                + Add to cart
            </button>
        );
    }

    return (
        <div className="product-list-item shadow-sm card flex-fill my-2">
            <div className="figure-img">
                <img src={imageUrl} alt={name} className="img card-img-top" />
            </div>
            <div className="card-body">
                <div className="card-title">
                    {name}
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <span className="fw-bold">{v_price(price)}</span>
                    </div>
                    <div>
                        <AddToCartBtn />
                    </div>
                </div>
            </div>
        </div>
    )
}
