import React from 'react'
import './BtnsAccount.scss'
import { NavLink } from 'react-router-dom'
import { setIsOpenAuthPopup } from '../../redux/actions/authAction'
import {useDispatch} from 'react-redux'

export default function BtnsAccount({ isAuth }) {
  const dispatch = useDispatch()
  const handleOpenAuthPopup = () => {
    !isAuth && dispatch(setIsOpenAuthPopup(true))
  }
  return (
    <div className='btnsAccount'>
      <div className='btnsAccount__btnContainer'>
        <NavLink to={isAuth && '/account/newOffer'}  onClick={() => handleOpenAuthPopup()}>
          <button className='btnsAccount__btnNewAd btnsAccount__btn'>Подать объявление</button>
        </NavLink>
      </div>
      <div className='btnsAccount__btnContainer'>
        <NavLink to={isAuth && '/account/myOffers'} onClick={() => handleOpenAuthPopup()}>
          <button className='btnsAccount__btn btnsAccount__btnAccount'>Личный кабинет</button>
        </NavLink>
      </div>
    </div>
  )
}
