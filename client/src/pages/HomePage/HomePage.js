import React, { useEffect, useState } from 'react'
import './HomePage.scss'
import HeaderNav from '../../components/Header/Header'
import { Button, Pagination, Header, Dropdown } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getAds, getSharesAds, getSalesAds, getRecommendedAds, getHotsAds, getRunsAds } from '../../redux/selectors/adsSelector';
import { useDispatch, useSelector } from 'react-redux'
import AdvertList from '../../components/AdvertList/AdvertList'
import { fetchAds, fetchSharesAds, fetchSalesAds, fetchRecommendedAds, fetchHotsAds, fetchRunAds } from '../../redux/actions/adsAction'
import SharesList from '../../components/SharesList/SharesList'
import SalesAds from '../../components/SalesAds/SalesAds'
import * as cityData from '../../assets/json/russian-cities.json'
import Axios from 'axios'
import config from '../../config/default.json'

export default function HomePage() {
  const { token, userId } = useAuth()
  const isAuth = !!token;
  const ads = useSelector(getAds);
  const sharesAds = useSelector(getSharesAds)
  const salesAds = useSelector(getSalesAds)
  const recommendedAds = useSelector(getRecommendedAds)
  const hotsAds = useSelector(getHotsAds)
  const runAds = useSelector(getRunsAds)
  const dispatch = useDispatch();
  const [cityDataArr, setCityDataArr] = useState(() => {
    const data = JSON.parse(JSON.stringify(cityData.default))
    const filteredCity = data.filter(item => item.population > 500000)
    const optionsCity = filteredCity.map((item, i) => {
      return { key: i, text: item.name, value: item.name }
    })
    return optionsCity
  }) // options for city filter
  const [selectedCity, setSelectedCity] = useState('') // dropdown city
  const [selectedFilteredPrice, setSelectedFilteredPrice] = useState('');
  const [filteredAds, setFilteredAds] = useState([])
  const [ page, setPage ] = useState(1)
  const [ countPage, setCountPage ] = useState(3)
  const optionFilterPrice = [
    { key: 1, text: 'По возрастанию', value: 'По возрастанию' },
    { key: 2, text: 'По убыванию', value: 'По убыванию' },
    { key: 3, text: 'Сбросить', value: '' }
  ]

  useEffect(async () => {
    dispatch(fetchAds(page))
    await Axios.get(`${config.serverUrl}/api/ads/countAds`).then(res => setCountPage(Math.ceil(res.data/10)))
    console.log(countPage)
  }, [page])

  useEffect(() => {
    
    dispatch(fetchSharesAds())
    dispatch(fetchSalesAds())
    dispatch(fetchRecommendedAds())
    dispatch(fetchHotsAds())
    dispatch(fetchRunAds())
  }, []);

  // filter by city
  useEffect(() => {
    let prepareFilteredAds = ads;
    if (selectedCity) {
      selectedCity ? prepareFilteredAds = ads.filter(ad => ad.city === selectedCity) : prepareFilteredAds = ads.filter(ad => ad.city === selectedCity)
    }
    setFilteredAds(prepareFilteredAds)
  }, [ads, selectedCity])

  //filter by product price
  useEffect(() => {
    let prepareFilteredAds = ads;

    if (selectedFilteredPrice) {
      if (selectedFilteredPrice === 'По возрастанию') {
        prepareFilteredAds = [...ads].sort((ad1, ad2) => compareAdPrice(Number(ad1.productPrice), Number(ad2.productPrice)));
      } else if (selectedFilteredPrice === 'По убыванию') {
        prepareFilteredAds = [...ads].sort((ad1, ad2) => compareAdPrice(Number(ad1.productPrice), Number(ad2.productPrice)))
        prepareFilteredAds.reverse()
      }
    }

    setFilteredAds(prepareFilteredAds)
  }, [ads, selectedFilteredPrice])

  const compareAdPrice = (ad1, ad2) => {
    if (ad1 < ad2) {
      return -1;
    }
    if (ad1 > ad2) {
      return 1;
    }
    // a должно быть равным b
    return 0;
  }

  return (
    <div className='homePage'>
      <HeaderNav/>
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
            <SalesAds salesArr={salesAds} />
          </div>
        </div>
        <div className='ads'>
          <div className="ads__shares">
            <h2>Акции:</h2>
            <SharesList sharesArr={sharesAds} />
          </div>
          <div className="ads__list">
            <div className='filter'>
              <Header as='h3'>Фильтр</Header>
              <Dropdown placeholder='Город' search selection options={cityDataArr} onChange={(e) => setSelectedCity(e.target.innerText)} />
              <Dropdown placeholder='Цена' search selection options={optionFilterPrice} onChange={(e) => setSelectedFilteredPrice(e.target.innerText)} />
            </div>
            <AdvertList advertArr={filteredAds} recommendedAds={recommendedAds} hotsAds={hotsAds} runAds={runAds} />
            <Pagination
              boundaryRange={0}
              defaultActivePage={1}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              totalPages={countPage}
              onPageChange={(event) => setPage(event.target.getAttribute('value'))}
            />
            {/* <AdvertList advertArr={silverAds}/>
            <AdvertList advertArr={commonAds}/> */}
          </div>
        </div>
      </div>
    </div>
  )
}
