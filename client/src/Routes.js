import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom"
import HomePage from './pages/HomePage/HomePage'
import AccountPage from './pages/AccountPage/AccountPage'
import AuthPage from './pages/AuthPage/AuthPage'
import RegPage from './pages/RegPage/RegPage'
import NewAdPage from './pages/NewAdPage/NewAdPage'
import DetailsAdPage from './pages/DetailsAdPage/DetailsAdPage'
import { useAuth } from './hooks/useAuth'
export default function Routes() {
  const { token } = useAuth()
  const isAuth = !!token;

  return (
    <Switch>
      <Route path="/home" exact>
        <HomePage />
      </Route>
      <Route path="/account" exact>
        <AccountPage />
      </Route>
      <Route path='/newAd'>
        {
          isAuth ? <NewAdPage/> : <AccountPage />
        }
      </Route>
      <Route path='/detailsAd/:adId' component={DetailsAdPage}/>
      <Route path='/auth' component={AuthPage} />
      <Route path='/registration' component={RegPage} />
      <Redirect to='/home' />
    </Switch>
  )
}
