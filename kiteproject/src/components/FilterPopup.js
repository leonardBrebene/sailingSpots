import React from 'react'
import ReactDom from 'react-dom'

const POP_UP_STYLE = {
    
    position: 'fixed',
    right: '7%',
    top: '9%',
    padding: '10px',
    zIndex: 1000,
    backgroundColor: 'rgb(179, 230, 255,0.3)',
    
}
const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.1)',
    zIndex: 1000
}


export default function FilterPopup({ open, children, closeIt}) {
    if (!open) return null

    return ReactDom.createPortal
    (
        <>
            <div onClick={closeIt} style={OVERLAY_STYLE} />
            <div style={POP_UP_STYLE}>
                {children}
            </div>
        </>,
        document.getElementById('portal')
    )
}


