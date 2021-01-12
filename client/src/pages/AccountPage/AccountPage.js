import React,{useEffect, useState} from 'react'
import { Header, Button,Container,Grid } from 'semantic-ui-react'
import { NavLink, Route, Switch, Link } from "react-router-dom"
import { useAuth } from '../../hooks/useAuth'
import axios from 'axios'
import config from '../../config/default.json'
import AdvertList from '../../components/AdvertList/AdvertList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../redux/actions/userAction'
import { getUser } from '../../redux/selectors/userSelector'

export default function AccountPage() {
  const {token, logout} = useAuth()
  const isAuth = !!token;
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const [ads, setAds ] = useState([])

  useEffect( () => {
    if(isAuth) {
      dispatch(fetchUser())
    }
  }, [isAuth])


  // обьявления
  useEffect(()  => {
    if(isAuth) {
      const result = user.ads && axios.post(`${config.serverUrl}/api/offer/getAdverts`,user.ads).then(res => setAds(res.data))
    }
  }, [user])

  if (isAuth) {
    return (
      <Container>
        <Grid columns={2}>
          <Grid.Column>
            <Header as='h2'>Вы авторизованы</Header>
            <Button onClick={() => logout()}>Выйти</Button>
            <Header as='h2'>Имя: {user.name}</Header>
            <Header as='h2'>Фамилия: {user.surname}</Header>
            <Header as='h2'>Почта: {user.email}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Объявления:</Header>
            <AdvertList advertArr={ads}></AdvertList>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }

  return (
    <div className='container'>
      <Header>
        <Header as='h2'>Войдите или зарегистрируйтесь </Header>
        <NavLink to='/home'>На главную</NavLink>
      </Header>
      <Switch>
        <div>
          <Link to='/auth'><Button>Войти</Button></Link>
          <Link to='/registration'><Button>Зарегистрироваться</Button></Link>
        </div>
      </Switch>
    </div>
  )
}
