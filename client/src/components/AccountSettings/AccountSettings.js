import React from 'react'
import './AccountSettings.scss'

export default function AccountSettings() {
  return (
    <div className='accountSettings'>
      <div className="accountSettings__item">
        <p className="accountSettings__text">Изменить контактные данные</p>
      </div>
      <div className="accountSettings__item">
        <p className="accountSettings__text">Изменить номер телефона</p>
      </div>
      <div className="accountSettings__item">
        <p className="accountSettings__text">Изменить пароль</p>
      </div>
      <div className="accountSettings__item">
        <p className="accountSettings__text">Изменить E-mail адрес</p>
      </div>
      <div className="accountSettings__item">
        <p className="accountSettings__text">Удалить учетную запись</p>
      </div>
    </div>
  )
}
