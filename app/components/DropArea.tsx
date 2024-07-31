import React from 'react';

const DropArea = (onDrop) => {
    const dropAreaStyle = {
        width: '100%',
        height: '200px',
        border: '2px dashed #ccc',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#888',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragLeave = (event) => {
        event.currentTarget.style.backgroundColor = '';
    };

    return (
        <section
            className='drop_area'
            style={dropAreaStyle}
            // onDrop={() => {
            //     onDrop();
            //     setShowDrop(false);
            // }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            Drop Here
        </section>
    );
};

export default DropArea;
