import React from 'react';

export default ({children}: any) => {
    return (
        <div style={{position: "absolute", width: "100%"}}>
            {children}
        </div>
    )
}