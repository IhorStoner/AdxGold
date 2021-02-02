import React, { useState } from 'react'
import Logo from '../Logo/Logo'
import './AuthPopup.scss'
import { reduxForm, Field } from 'redux-form'
import TextField from '../TextField/TextField'
import { useDispatch } from 'react-redux'

function AuthPopup({ handleSubmit, valid, submitting, activeForm, setActiveForm, successfulReg,setSuccessfulReg,actionClose }) {
  const dispatch = useDispatch()
  const handleAuthClick = () => {
    setActiveForm('auth')
    setSuccessfulReg(false)
  }

  const handleRegClick = () => {
    setActiveForm('reg')
    setSuccessfulReg(false)
  }
  
  return (
    <div className="fixed-overlay">
      <div className='modal'>
        <div className="modal_container">
          <form className="authPopup" onSubmit={handleSubmit}>
            <>
              <button type='button' className="authPopup__btnClose" onClick={() => dispatch(actionClose(false))}></button>
            </>
            <Logo />
            <div className="authPopup__btns">
              <button type='button' className={`authPopup__btn ${activeForm === 'auth' && 'authPopup__btn--active'}`} onClick={() => handleAuthClick()}>Вход</button>
              <button type='button' className={`authPopup__btn ${activeForm === 'reg' && 'authPopup__btn--active'}`} onClick={() => handleRegClick()}>Регистрация</button>
            </div>
            {
              !successfulReg ?
                <>
                  <div className="authPopup__inputs">
                    {activeForm === 'reg' && <Field className='authPopup__input authPopup__input--name' name='name' component={TextField} placeholder='Имя'></Field>}
                    <Field className='authPopup__input authPopup__input--email' name='email' component={TextField} placeholder='E-mail'></Field>
                    <Field className='authPopup__input authPopup__input--password' name='password' component={TextField} placeholder='Пароль'></Field>
                  </div>
                  <div className="authPopup__submitContainer">
                    <button type='submit' className='authPopup__btnSubmit'>{activeForm === 'auth' ? 'Войти' : 'Регистрация'}</button>
                  </div>
                </>
                :
                <div className="authPopup__regSuccess">
                  <p className='authPopup__regText'>Регестрация заверешена успешно!</p>
                </div>
            }
          </form>
        </div>
      </div>
    </div>
  )
}


export default reduxForm({
  form: "auth",
  // validate,
  // asyncValidate,
  // asyncBlurFields: ['email']
})(AuthPopup);