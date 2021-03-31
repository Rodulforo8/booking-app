import React from 'react'
import logo from '../../images/logo-tutenlabs.png'
const Footer = () => {
    return (
        <div style={footerStyle}>
            <img style={{ height: "30px", width: "100%", objectFit: "contain" }} src={logo} />
        </div>
    )
}

const footerStyle = {
    backgroundColor: '#ffffff',
    color: 'white',
    margin: 'auto',
    padding: '0.3em',
    textAlign: 'center',
    position: "absolute",
    bottom: "-2.6em",
    width: "100%"
}

export default Footer