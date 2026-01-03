import React from 'react';

const MagnifyingCursor = ({ children, magnification = 1.8, lensSize = 180 }) => {
    return (
        <div className="relative">
            {/* Placeholder for FluidGlass / MagnifyingCursor effect */}
            {children}
        </div>
    );
};

export default MagnifyingCursor;
