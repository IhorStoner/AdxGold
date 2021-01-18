import React, { useCallback, useContext, useState, useEffect } from 'react'
// import { Header, Message } from 'semantic-ui-react'
// import AuthForm from '../../components/AuthForm/AuthForm'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom'
import config from '../../config/default.json'
import HomePage from '../HomePage/HomePage'
import { useAuth } from '../../hooks/useAuth'
import AuthPopup from '../../components/AuthPopup/AuthPopup'

export default function AuthPage() {
  const [signInSuccess, setSignInSuccess] = useState(false);
  const { token, userId } = useAuth()
  const isAuth = !!token;
  const [error, setError] = useState('');
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isOpenForm, setIsOpenForm] = useState(() => {
    if (isAuth) {
      return false
    } else {
      return true
    }
  })
  const [activeForm, setActiveForm] = useState('auth')
  const [successfulReg, setSuccessfulReg] = useState(false)

  const onSubmitAuth = useCallback(async values => {
    const result = await axios.post(`${config.serverUrl}/api/auth`, values)
      .then(res => {
        auth.login(res.data.token, res.data.id)
        setSignInSuccess(true)
        setError('')
        history.push('/home')
      })
      .catch(err => {
        setError(err.response.data.error)
        setSignInSuccess(false)
      })
  }, [])

  const onSubmitReg = useCallback(async values => {
    await axios.post(`${config.serverUrl}/api/registration`, values).then(res => setSuccessfulReg(true))
  }, [])

  if (isAuth) {
    history.push('/account')
  }

  return (
    <div>
      <AuthPopup setIsOpenForm={setIsOpenForm}
        successfulReg={successfulReg}
        setSuccessfulReg={setSuccessfulReg}
        activeForm={activeForm}
        setActiveForm={setActiveForm}
        onSubmit={activeForm === 'auth' ? onSubmitAuth : onSubmitReg}
      />
      <HomePage />
    </div>
  )
}