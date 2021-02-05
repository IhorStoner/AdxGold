import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom"
import HomePage from './pages/HomePage/HomePage'
import AccountPage from './pages/AccountPage/AccountPage'
import DetailsAdPage from './pages/DetailsAdPage/DetailsAdPage'

export default function Routes() {

  return (
    <Switch>
      <Route path="/home/:nav" >
        <HomePage />
      </Route>
      <Route path="/account/:accountNav" exact>
        <AccountPage />
      </Route>
      <Route path='/detailsAd/:adId' component={DetailsAdPage}/>
      <Redirect to='/home/saleBuy' />
    </Switch>
  )
}
