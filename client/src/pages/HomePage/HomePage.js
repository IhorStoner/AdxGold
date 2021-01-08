import React, { useEffect, useState } from 'react'
import './HomePage.scss'
import HeaderNav from '../../components/Header/Header'
import { Button, Header, Dropdown } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getAds, getSharesAds, getSalesAds, getRecommendedAds, getHotsAds, getRunsAds, getPages } from '../../redux/selectors/adsSelector';
import { useDispatch, useSelector } from 'react-redux'
import AdvertList from '../../components/AdvertList/AdvertList'
import { fetchAds, fetchSharesAds, fetchSalesAds, fetchRecommendedAds, fetchHotsAds, fetchRunAds } from '../../redux/actions/adsAction'
import SharesList from '../../components/SharesList/SharesList'
import SalesAds from '../../components/SalesAds/SalesAds'
import BtnsAccount from '../../components/BtnsAccount/BtnsAccount'
import BoardAdsBar from '../../components/BoardAdsBar/BoardAdsBar'
import { getCity } from '../../redux/selectors/filterSelector'
import Pagination from '../../components/Pagination/Pagination'
import Footer from '../../components/Footer/Footer'
import { fetchUser } from '../../redux/actions/userAction'
import { getUser } from '../../redux/selectors/userSelector'

export default function HomePage() {
  const { token, userId } = useAuth()
  const isAuth = !!token;
  const user = useSelector(getUser)
  const ads = useSelector(getAds);
  const pages = useSelector(getPages)
  const sharesAds = useSelector(getSharesAds)
  const salesAds = useSelector(getSalesAds)
  const recommendedAds = useSelector(getRecommendedAds)
  const hotsAds = useSelector(getHotsAds)
  const runAds = useSelector(getRunsAds)
  const selectedCity = useSelector(getCity)
  const dispatch = useDispatch();
  const [selectedFilteredPrice, setSelectedFilteredPrice] = useState(null);
  const [selectedFilteredDate, setSelectedFilteredDate] = useState(null)
  const [page, setPage] = useState(1)

  const optionFilterPrice = [
    { key: 1, text: 'По возрастанию', value: 'high' },
    { key: 2, text: 'По убыванию', value: 'low' },
    { key: 3, text: 'Сбросить', value: '' }
  ]
  const optionFilterDate = [
    { key: 1, text: 'Сначала новые', value: 'high' },
    { key: 2, text: 'Сначала старые', value: 'low' },
    { key: 3, text: 'Сбросить', value: '' }
  ]

  useEffect(async () => {
    console.log(page)
    dispatch(fetchAds({ page: page, city: selectedCity, price: selectedFilteredPrice, date: selectedFilteredDate }))
  }, [page, selectedCity, selectedFilteredPrice, selectedFilteredDate])

  useEffect( () => {
    if(isAuth) {
      dispatch(fetchUser())
    }
  }, [isAuth])

  useEffect(() => {
    dispatch(fetchSharesAds())
    dispatch(fetchSalesAds())
    dispatch(fetchRecommendedAds())
    dispatch(fetchHotsAds())
    dispatch(fetchRunAds())
  }, []);


  return (
    <div className='homePage'>
      <HeaderNav />
      <div className="container">
        <div className='homePage__content'>
          <BtnsAccount isAuth={true} />
          <BoardAdsBar />
        </div>
        <div className='ads'>
          <div className="ads__shares">
            <SharesList sharesArr={sharesAds} />
          </div>
          <div className="ads__list">
            {/* <div className='filter'>
              <Header as='h3'>Фильтр</Header>
              <Dropdown placeholder='Город' clearable search selection options={cityDataArr} onChange={(e) => setSelectedCity(e.target.innerText)} />
              <Dropdown placeholder='Цена' search selection options={optionFilterPrice} onChange={(e) => setSelectedFilteredPrice(e.target.innerText)} />  // filters
              <Dropdown placeholder='По дате' search selection options={optionFilterDate} onChange={(e) => setSelectedFilteredDate(e.target.innerText)} />
            </div> */}
            {ads && <AdvertList advertArr={ads} recommendedAds={recommendedAds} hotsAds={hotsAds} runAds={runAds} visitedAds={user.visitedAds}/>}
            <Pagination totalPages={pages} onPageChange={(e) => setPage(e.target.innerText)}/>  {/*totalPAges = pages*/}
            {/* <Pagination
              boundaryRange={0}
              defaultActivePage={1}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              totalPages={pages}
              onPageChange={(event) => setPage(event.target.getAttribute('value'))}
            /> */}
            <div className="mainContent__discounts">
              <SalesAds salesArr={salesAds} />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
