import React from 'react';

export default function Loader() {
    const styles = {
        minHeight: 'calc(100vh - 232px)'
    };
    return (
        <div style={styles} className="fs-4 d-flex justify-content-center align-items-center">
            <span className="spinner-border d-block" role="status"></span>
            <span className="ms-2 fw-bold">Loading...</span>
        </div>
    );
}
