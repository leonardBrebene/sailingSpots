import React from 'react'
import ReactDom from 'react-dom'

const FYLTER_FORM_STYLE = {
    
    position: 'fixed',
    right: '7%',
    top: '10%',
    padding: '5px',
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
    zIndex: 800
}


export default function PopUpPortal({ open,isFilter, children, closeIt}) {
    if (!open) return null

    return ReactDom.createPortal
    (
        <>
            <div onClick={closeIt} style={OVERLAY_STYLE} />
            <div style={isFilter&&FYLTER_FORM_STYLE}>
                {children} 
            </div>
        </>,
        document.getElementById('portal')
    )
}


