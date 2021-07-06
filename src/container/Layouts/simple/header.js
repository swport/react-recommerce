import React, { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';

import CartBar from './header/cart';

function MenuLink({ label, to, classes }) {
    let match = useRouteMatch({
        path: to,
        exact: true
    });

    return (
        <Link to={to} className={`${classes}${match ? ' active':''}`}>
            {label}
        </Link>
    );
}

export default function Header() {
    const { items, totalItems } = useContext(CartContext);
    const { user, isLoggedIn, userLoaded, logoutAction } = useContext(AuthContext);

    function UserItem() {
        if( ! isLoggedIn ) {
            // if user hasn't been loaded yet, show a spinner
            if( ! userLoaded ) {
                return (
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Logging in..</span>
                    </div>
                );
            }

            return <MenuLink label="Login" to="/auth" classes="nav-link" />;
        }

        // logged-in user
        return (
            <div className="dropdown d-flex align-items-center">
                <button className="btn btn-light dropdown-toggle" type="button" id="userMenuDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.name}
                </button>
                <ul className="dropdown-menu" aria-labelledby="userMenuDropdown">
                    <li><a onClick={() => logoutAction()} className="dropdown-item" href="#">Logout</a></li>
                </ul>
            </div>
        );
    }

    return (
        <header>
            <nav className="navbar shadow-sm fixed-top navbar-expand-lg navbar-light bg-light">
                <div className="container">

                    <MenuLink label="AE-Commerce" to="/" classes="navbar-brand logo fw-bold" />

                    <a href="#" className="d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                        Cart <span className="fs-xs">({totalItems})</span>
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <MenuLink label="Home" to="/" classes="nav-link" />
                            </li>
                            <li className="nav-item">
                                <MenuLink label="Shop" to="/shop" classes="nav-link" />
                            </li>
                            <li className="nav-item d-flex align-items-center px-2">
                                <UserItem />
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                                    Cart <span className="fs-xs">({totalItems})</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <CartBar />
                </div>
            </nav>
        </header>
    )
}
