import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useFormik } from 'formik';

const validate = values => {
    const errors = {};

    if (!values.login_password) {
        errors.login_password = 'Required';
    } else if (values.login_password.length > 20) {
        errors.login_password = 'Must be 20 characters or less';
    }

    if (!values.login_email) {
        errors.login_email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login_email)) {
        errors.login_email = 'Invalid email address';
    }

    return errors;
};

export default function Login() {

    const { loginAction, isLoading } = useContext(AuthContext);

    const loginForm = useFormik({
        initialValues: {
            login_email: 'john.doe@email.com',
            login_password: 'password'
        },
        validate,
        onSubmit: (values) => {
            if( isLoading ) return;

            loginAction({
                email: values.login_email,
                password: values.login_password
            });
        },
    });

    useEffect(() => {
        let timeout;

        if( isLoading ) {
            timeout = window.setTimeout(function() {
                isLoading && alert('Taking longer than usual');
            }, 3000);
        }

        return () => window.clearTimeout(timeout);
    }, [isLoading]);

    return (
        <form className="my-4" onSubmit={loginForm.handleSubmit} method="post">
            <fieldset disabled={isLoading}>
                <div className="mb-3">
                    <label htmlFor="login_email" className="form-label">Email</label>
                    <input
                        type="text" className="form-control" id="login_email"
                        value={loginForm.values.login_email}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                    />
                    {loginForm.touched.login_email && loginForm.errors.login_email
                        ? <div className="invalid-feedback d-block">{loginForm.errors.login_email}</div>
                        : null
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="login_password" className="form-label">Password</label>
                    <input
                        type="password" className="form-control" id="login_password"
                        value={loginForm.values.login_password}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                    />
                    {loginForm.touched.login_password && loginForm.errors.login_password
                        ? <div className="invalid-feedback d-block">{loginForm.errors.login_password}</div>
                        : null
                    }
                </div>
                <button type="submit" className="btn btn-primary">
                    {isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                    Submit
                </button>
            </fieldset>
        </form>
    )
}
