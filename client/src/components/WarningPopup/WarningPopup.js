import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import './WarningPopup.scss'

export default function WarningPopup({setIsOpenWarning}) {
  return (

    <div className="fixed-overlay">
      <div className='modal'>
        <div className="modal_container">
          <div className='warningPopup'>
            <button className="warningPopup__btnClose" onClick={() => setIsOpenWarning(false)}/>
            <div className="warningPopup__logo">
              <Logo />
            </div>
            <div className="warningPopup__content">
              <p className="warningPopup__text">
                Отправлять сообщения могут только зарегистрированные пользователи
              </p>
            </div>
            <div className="warningPopup__linksContainer">
              <Link to='/auth' className="warningPopup__link warningPopup__link--signIn">Вход</Link>
              <Link to='/registration' className="warningPopup__link">Регистрация</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
