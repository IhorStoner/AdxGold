import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom"
import HomePage from './pages/HomePage/HomePage'
import AccountPage from './pages/AccountPage/AccountPage'
import AuthPage from './pages/AuthPage/AuthPage'
import RegPage from './pages/RegPage/RegPage'
import NewAdPage from './pages/NewAdPage/NewAdPage'

export default function Routes() {
  return (
    <Switch>
      <Route path="/home" exact>
        <HomePage />
      </Route>
      <Route path="/account" exact>
        <AccountPage />
      </Route>
      <Route path='/newAd'>
        <NewAdPage/>
      </Route>
      <Route path='/auth' component={AuthPage} />
      <Route path='/registration' component={RegPage} />
      <Redirect to='/home' />
    </Switch>
  )
}
