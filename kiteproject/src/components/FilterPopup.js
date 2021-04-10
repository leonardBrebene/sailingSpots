import React from 'react'
import ReactDom from 'react-dom'

const POP_UP_STYLE = {
    position: 'fixed',
    right: '10%',
    padding: '50px',
    top: '10px',
    zIndex: 1000
}
const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.2)',
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
                <button onClick={closeIt}>Close Modal</button>
            </div>
        </>,
        document.getElementById('portal')
    )
}


