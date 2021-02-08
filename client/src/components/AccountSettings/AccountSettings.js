import React, { useState, useCallback, useEffect } from 'react'
import './AccountSettings.scss'
import axios from 'axios'
import config from '../../config/default.json'
import { useSelector } from 'react-redux'
import { getUser } from '../../redux/selectors/userSelector'
import FormItem from './FormItem.js'


export default function AccountSettings() {
  const [activeItem, setActiveItem] = useState('')
  const [valueForm, setValueForm] = useState('')

  const user = useSelector(getUser)

  const handleChangePassword = async () => {
    await axios.put(`${config.serverUrl}/api/users/userPassword/${user._id}`, { password: valueForm })
  }

  const handleChangeName = async () => {
    await axios.put(`${config.serverUrl}/api/users/userName/${user._id}`, { name: valueForm })
  }
  const handleChangePhone = async () => {
    await axios.put(`${config.serverUrl}/api/users/userPhone/${user._id}`, { phone: valueForm })
  }
  const handleChangeEmail = async () => {
    await axios.put(`${config.serverUrl}/api/users/userEmail/${user._id}`, { email: valueForm })
  }
  const handleDeleteAccount = async () => {
    await axios.delete(`${config.serverUrl}/api/users/${user._id}`, { email: valueForm })
  }

  const handleBtnReset = () => {
    setActiveItem('')
    setValueForm('')
  }

  const handleChangeActiveForm = (formName) => {
    if(formName === activeItem) {
      setActiveItem('')
      setValueForm('')
    } else {
      setActiveItem(formName)
      setValueForm('')
    }
  }

  return (
    <div className='accountSettings'>
      <div className="accountSettings__item">
        <p className="accountSettings__text" onClick={() => handleChangeActiveForm('contacts')}>Изменить контактные данные</p>
      </div>
      {activeItem === 'contacts' &&
        <FormItem text='Изменить имя' handleBtnSubmit={handleChangeName} handleBtnReset={handleBtnReset} valueForm={valueForm} setValueForm={setValueForm}/>
      }
      <div className="accountSettings__item">
        <p className="accountSettings__text" onClick={() => handleChangeActiveForm('phone')}>Изменить номер телефона</p>
      </div>
      {activeItem === 'phone' &&
        <FormItem text='Изменить номер телефона*' handleBtnSubmit={handleChangePhone} handleBtnReset={handleBtnReset} valueForm={valueForm} setValueForm={setValueForm}/>
      }
      <div className="accountSettings__item">
        <p className="accountSettings__text" onClick={() => handleChangeActiveForm('password')}>Изменить пароль</p>
      </div>
      {activeItem === 'password' &&
        <FormItem text='Изменить пароль*' handleBtnSubmit={handleChangePassword} handleBtnReset={handleBtnReset} valueForm={valueForm} setValueForm={setValueForm}/>
      }
      <div className="accountSettings__item">
        <p className="accountSettings__text" onClick={() => handleChangeActiveForm('mail')}>Изменить E-mail адрес</p>
      </div>
      {activeItem === 'mail' &&
        <FormItem text='Изменить email-адрес*' handleBtnSubmit={handleChangeEmail} handleBtnReset={handleBtnReset} valueForm={valueForm} setValueForm={setValueForm}/>
      }
      <div className="accountSettings__item">
        <p className="accountSettings__text" onClick={() => handleChangeActiveForm('delete')}>Удалить учетную запись</p>
      </div>
      {activeItem === 'delete' &&
        <FormItem text='Вы точно хотите удалить?' handleBtnSubmit={handleDeleteAccount} handleBtnReset={handleBtnReset} valueForm={valueForm} setValueForm={setValueForm} btnOkText='Удалить' isInput={false}/>
      }
    </div>
  )
}
