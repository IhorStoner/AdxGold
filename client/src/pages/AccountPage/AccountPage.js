import React,{useEffect} from 'react'
import { Header, Button } from 'semantic-ui-react'
import { NavLink, Route, Switch, Link } from "react-router-dom"
import { useAuth } from '../../hooks/useAuth'

export default function AccountPage() {
  const {token, logout} = useAuth()
  const isAuth = !!token;

  useEffect(() => {
    console.log(isAuth)
  }, [])

  if (isAuth) {
    return (
      <div className='container'>
        <Header as='h2'>Вы авторизованы</Header>
        
        <Button onClick={() => logout()}>Выйти</Button>
      </div>
      
    )
  }

  return (
    <div className='container'>
      <Header>
        <Header as='h2'>Войдите или зарегистрируйтесь </Header>
        <NavLink to='/home'>На главную</NavLink>
      </Header>
      <Switch>
        <Route path='/account' exact>
          <Link to='/auth'><Button>Войти</Button></Link>
          <Link to='/registration'><Button>Зарегистрироваться</Button></Link>
        </Route>
      </Switch>
    </div>
  )
}
