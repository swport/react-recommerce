import React, { useContext } from 'react';

import {
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import { routes } from './routes';
import NotFound from '../container/404';

const RenderRoute = ({ component: Component, isProtected, isLoggedIn, ...rest }) => {
    return (
        <Route
            render={(props) =>
                (!isProtected || (isProtected && isLoggedIn))
                ? <Component {...props} />
                : <Redirect to="/auth" />
            }
            {...rest}
        />
    );
};

function Routes() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <Switch>
            {routes.map(({ path, component, isProtected = false, exact = false }) => (
                <RenderRoute
                    key={path}
                    path={path}
                    exact={exact}
                    isProtected={isProtected}
                    isLoggedIn={isLoggedIn}
                    component={component}
                />
            ))}
            <Route component={NotFound} />
        </Switch>
    );
};

export default Routes;