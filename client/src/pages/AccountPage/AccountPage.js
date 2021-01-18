import React, { useEffect, useState,useCallback,useContext } from 'react'
import { Header, Button, Container, Grid } from 'semantic-ui-react'
import { Redirect, useHistory } from "react-router-dom"
import { useAuth } from '../../hooks/useAuth'
import axios from 'axios'
import config from '../../config/default.json'
import AdvertList from '../../components/AdvertList/AdvertList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../redux/actions/userAction'
import { getUser } from '../../redux/selectors/userSelector'
import AuthPopup from '../../components/AuthPopup/AuthPopup'
import HomePage from '../HomePage/HomePage'
import { AuthContext } from '../../context/AuthContext';

export default function AccountPage() {
  const { token, logout, ready } = useAuth()
  const isAuth = !!token;
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [error, setError] = useState('');
  const auth = useContext(AuthContext);
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const [ads, setAds] = useState([])
  const history = useHistory()
  const [isOpenForm, setIsOpenForm] = useState(() => {
    if(isAuth) {
      return false
    } else {
      return true
    }
  })
  const [ activeForm, setActiveForm ] = useState('auth')

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchUser())
    }
  }, [isAuth])


  // обьявления
  useEffect(() => {
    if (isAuth) {
      const result = user.ads && axios.post(`${config.serverUrl}/api/offer/getAdverts`, user.ads).then(res => setAds(res.data))
    }
  }, [user])

  const handleLogout = () => {
    logout()
    history.push('/home')
  }

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
    await axios.post(`${config.serverUrl}/api/registration`, values).then(res => history.push('/home')) 
  },[])

  if (isAuth) {
    return (
      <Container>
        <div>
          <Header as='h2'>Вы авторизованы</Header>
          <Button onClick={() => handleLogout()}>Выйти</Button>
          <Header as='h2'>Имя: {user.name}</Header>
          <Header as='h2'>Фамилия: {user.surname}</Header>
          <Header as='h2'>Почта: {user.email}</Header>
        </div>
        <div>
          <Header>Объявления:</Header>
          <AdvertList advertArr={ads}></AdvertList>
        </div>
      </Container>
    )
  }

  return (
    <div>
      <AuthPopup setIsOpenForm={setIsOpenForm} activeForm={activeForm} setActiveForm={setActiveForm} onSubmit={activeForm === 'auth' ? onSubmitAuth : onSubmitReg} />
      <HomePage />
    </div>
  )
}
