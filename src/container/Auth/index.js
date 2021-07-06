import React, { useContext } from 'react';
import Login from './login';
import Signup from './signup';

export default function Auth() {

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div style={{width: '480px'}}>
                <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                            Login
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                            Signup
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h2 className="fw-bold">Login</h2>
                    
                        <Login />
                    </div>

                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <h2 className="fw-bold">Signup</h2>

                        <Signup />
                    </div>
                </div>
                
            </div>
        </div>
    )
}
