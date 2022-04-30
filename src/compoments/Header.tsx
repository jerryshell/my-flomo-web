import React from 'react'
import logo from '../favicon.svg'

const Header = () => {
    return (
        <h1>
            <img
                src={ logo }
                alt="logo"
            />
            <span> </span>
            <span>My Flomo</span>
        </h1>
    )
}

export default Header
