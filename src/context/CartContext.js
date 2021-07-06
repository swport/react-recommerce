import React, {
    createContext,
    useEffect,
    useReducer
} from 'react';

const lStorage = require('store'); // store.js library

export const CartContext = createContext();

const initialState = {
    items: []
};

// helper functions
function addCartItem( cartItems, cartItemToAdd, byCount = 1 ) {
    const existingItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if ( existingItem ) {
        return cartItems.map(cartItem => {
            if( cartItem.id === cartItemToAdd.id ) {
                return { ...cartItem, quantity: cartItem.quantity + byCount };
            }
            return cartItem;
        })
    }

    return [...cartItems, { ...cartItemToAdd, quantity: byCount }];
}

function removeCartItem( cartItems, id ) {
    return cartItems.filter(cartItem => cartItem.id !== id);
}

function increaseCartItemQty( cartItems, id, byCount = 1 ) {
    return cartItems.map(item => {
        return item.id === id
            ? { ...item, quantity: item.quantity + byCount }
            : item;
    });
}

function decreaseCartItemQty( cartItems, id, byCount = 1 ) {
    const existingItem = cartItems.find(cartItem => cartItem.id === id);

    if( existingItem ) {
        if( (existingItem.quantity - byCount) < 1 ) {
            return cartItems.filter(cartItem => cartItem.id !== id);
        }

        return cartItems.map(cartItem => {
            if( cartItem.id === id ) {
                return { ...cartItem, quantity: cartItem.quantity - byCount };
            }
            return cartItem;
        });
    }

    return cartItems;
}

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_CART_ITEM':
            const { item, byCount } = action.payload;

            return {
                ...state,
                items: addCartItem(state.items, item, byCount)
            };

        case 'REMOVE_CART_ITEM':
            return {
                ...state,
                items: removeCartItem(state.items, action.payload)
            };

        case 'ITEM_COUNT_DEC':
            return {
                ...state,
                items: decreaseCartItemQty(state.items, action.payload.id, action.payload.byCount)
            };

        case 'ITEM_COUNT_INC':
            return {
                ...state,
                items: increaseCartItemQty(state.items, action.payload.id, action.payload.byCount)
            };
    }

    return state;
}

export default function CartProvider({ children }) {

    const [state, dispatch] = useReducer(
        cartReducer,
        initialState,
        function() {
            const items = lStorage.get('cart__items');
            if( items && items.length ) {
                initialState.items = items;
            }

            return initialState;
        }
    );

    // update localstorage whenever cart-items changes
    useEffect(() => {
        lStorage.set('cart__items', state.items);
    }, [state.items]);

    // console.log("items: ", state.items);

    const addItem =
        (item, byCount = 1) => dispatch({ type: 'ADD_CART_ITEM', payload: { item, byCount } });

    const removeItem =
        (id) => dispatch({ type: 'REMOVE_CART_ITEM', payload: id });

    const itemQtyDecrease =
        (id, byCount = 1) => dispatch({ type: 'ITEM_COUNT_DEC', payload: {id, byCount} });

    const itemQtyIncrease =
        (id, byCount = 1) => dispatch({ type: 'ITEM_COUNT_INC', payload: {id, byCount} });

    const totalItems = state.items
        .reduce((count, cartItem) => count + cartItem.quantity, 0);

    return (
        <CartContext.Provider value={{
            ...state,
            totalItems,
            addItem,
            removeItem,
            itemQtyDecrease,
            itemQtyIncrease
        }}>
            {children}
        </CartContext.Provider>
    );
}