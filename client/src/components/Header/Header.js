import React from 'react'
import Logo from '../Logo/Logo'
import Navbar from '../Navbar/Navbar'
import './Header.scss'

export default function Header() {
  return (
    <header className='headerContent'>
      <div className='container'>
        <div className='headerContent__content'>
          <Logo />
          <Navbar />
        </div>
      </div>
    </header>
  )
}
