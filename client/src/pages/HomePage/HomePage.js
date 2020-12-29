import React, { useEffect } from 'react'
import './HomePage.scss'
import Navbar from '../../components/Navbar/Navbar'
import Logo from '../../components/Logo/Logo'
import { Button, Input,Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getAds, getSharesAds, getSalesAds,getRecommendedAds, getHotsAds } from '../../redux/selectors/adsSelector';
import { useDispatch, useSelector } from 'react-redux'
import AdvertList from '../../components/AdvertList/AdvertList'
import { fetchAds, fetchSharesAds,fetchSalesAds, fetchRecommendedAds,fetchHotsAds } from '../../redux/actions/adsAction'
import SharesList from '../../components/SharesList/SharesList'
import SalesAds from '../../components/SalesAds/SalesAds'


export default function HomePage() {
  const {token, userId} = useAuth()
  const isAuth = !!token;
  const ads = useSelector(getAds);
  const sharesAds = useSelector(getSharesAds)
  const salesAds = useSelector(getSalesAds)
  const recommendedAds = useSelector(getRecommendedAds)
  const hotsAds = useSelector(getHotsAds)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAds())
    dispatch(fetchSharesAds())
    dispatch(fetchSalesAds())
    dispatch(fetchRecommendedAds())
    dispatch(fetchHotsAds())
  }, []);

  return (
    <div className='homePage'>
      <header className='headerContent'>
        <div className='container'>
          <div className='headerContent__content'>
            <Logo />
            <Navbar />
          </div>
        </div>
      </header>
      <div className="container">
        <div className='mainContent'>
          <aside className='mainContent__btns'>
            <div className="mainContent__newAd">
              <NavLink to={isAuth ? '/newAd' : '/auth'}>
                <Button>Дать объявление</Button>
              </NavLink>
            </div>
            <div className="mainContent__account">
              <NavLink to={isAuth ? '/account' : '/auth'}>
                <Button>Личный кабинет</Button>
              </NavLink>
            </div>
          </aside>
          <div className="mainContent__discounts">
            <Header as='h2'>Скидки</Header>
            <SalesAds salesArr={salesAds}/>
          </div>
        </div>
        <div className='ads'>
          <div className="ads__shares">
            <h2>Акции:</h2>
            <SharesList sharesArr={sharesAds}/>
          </div>
          <div className="ads__list">
            <div className='search'>
              <Input icon='search' placeholder='Search...' />
            </div>
            <AdvertList advertArr={ads} recommendedAds={recommendedAds} hotsAds={hotsAds}/>
            {/* <AdvertList advertArr={silverAds}/>
            <AdvertList advertArr={commonAds}/> */}
          </div>
        </div>
      </div>
    </div>
  )
}
