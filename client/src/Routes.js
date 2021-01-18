import React,{useEffect, useState} from 'react'
import { Redirect, Route, Switch } from "react-router-dom"
import HomePage from './pages/HomePage/HomePage'
import AccountPage from './pages/AccountPage/AccountPage'
import AuthPage from './pages/AuthPage/AuthPage'
import NewAdPage from './pages/NewAdPage/NewAdPage'
import DetailsAdPage from './pages/DetailsAdPage/DetailsAdPage'
import { useAuth } from './hooks/useAuth'

export default function Routes() {

  return (
    <Switch>
      <Route path="/home" >
        <HomePage />
      </Route>
      <Route path="/account" exact>
        <AccountPage />
      </Route>
      <Route path='/newAd'>
        <NewAdPage/>  
      </Route>
      <Route path='/detailsAd/:adId' component={DetailsAdPage}/>
      <Route path='/auth' component={AuthPage} />
      <Redirect to='/home' />
    </Switch>
  )
}
