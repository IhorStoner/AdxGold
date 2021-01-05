import React from 'react'
import './BtnsAccount.scss'
import { NavLink } from 'react-router-dom'

export default function BtnsAccount({isAuth}) {

  return (
    <div className='btnsAccount'>
      <div className='btnsAccount__btnContainer'>
        <NavLink to={isAuth ? '/newAd' : '/account'}>
          <button className='btnsAccount__btnNewAd btnsAccount__btn'>Подать объявление</button>
        </NavLink>
      </div>
      <div className='btnsAccount__btnContainer'>
        <NavLink to={'/account'}>
          <button className='btnsAccount__btn btnsAccount__btnAccount'>Личный кабинет</button>
        </NavLink>
      </div>
    </div>
  )
}
