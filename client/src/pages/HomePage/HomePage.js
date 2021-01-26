import React, { useEffect, useState } from 'react'
import './HomePage.scss'
import { useParams } from 'react-router-dom'
import HeaderNav from '../../components/Header/Header'
import { useAuth } from '../../hooks/useAuth'
import { getAds, getSharesAds, getSalesAds, getRecommendedAds, getHotsAds, getRunsAds, getPages, getLoading } from '../../redux/selectors/adsSelector';
import { useDispatch, useSelector } from 'react-redux'
import AdvertList from '../../components/AdvertList/AdvertList'
import { fetchAds, fetchSharesAds, fetchSalesAds, fetchRecommendedAds, fetchHotsAds, fetchRunAds } from '../../redux/actions/adsAction'
import SharesList from '../../components/SharesList/SharesList'
import SalesAds from '../../components/SalesAds/SalesAds'
import BtnsAccount from '../../components/BtnsAccount/BtnsAccount'
import BoardAdsBar from '../../components/BoardAdsBar/BoardAdsBar'
import { getCity,getSubsection,getSection } from '../../redux/selectors/filterSelector'
import Pagination from '../../components/Pagination/Pagination'
import Footer from '../../components/Footer/Footer'
import { fetchUser } from '../../redux/actions/userAction'
import { getUser, getFavoritesArr } from '../../redux/selectors/userSelector'
import DimmerLoader from '../../components/DimmerLoader/DimmerLoader'

export default function HomePage() {
  const { nav } = useParams();
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
  const favoritesArr = useSelector(getFavoritesArr)
  const dispatch = useDispatch();
  const [selectedFilteredPrice, setSelectedFilteredPrice] = useState(null);
  const [selectedFilteredDate, setSelectedFilteredDate] = useState(null)
  const [page, setPage] = useState(1)
  const [paginations, setPaginations] = useState([
    { totalPages: pages, currentPage: 1 }
  ]);
  const isLoading = useSelector(getLoading)
  const updatePaginations = (index, currentPage) => {
    setPaginations(paginations.map((n, i) => i === index ? { ...n, currentPage } : n));
    setPage(currentPage)
  }
  const [category, setCategory] = useState('')


  //filterBySection
  const section = useSelector(getSection)
  const subsection = useSelector(getSubsection)
  
  // categoryNAv
  useEffect(() => {
    if (nav === 'saleBuy') setCategory('Продам/куплю')
    if (nav === 'property') setCategory('Недвижимость')
    if (nav === 'auto') setCategory('Авто')
    if (nav === 'services') setCategory('Услуги')
    if (nav === 'work') setCategory('Работа')
    if (nav === 'newAuto') setCategory('Новые авто')
    if (nav === 'newHouse') setCategory('Новые квартиры')
    if (nav === 'favorites') setCategory('favorites')
  }, [nav])

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

  useEffect(() => {
    if (category !== 'favorites') {
      dispatch(fetchAds({
        page: page,
        city: selectedCity,
        price: selectedFilteredPrice,
        date: selectedFilteredDate,
        category: category,
        categoryDropdown: section,
        subcategoryDropdown: subsection,
      }))
    }
  }, [page, selectedCity, selectedFilteredPrice, selectedFilteredDate, category, section,subsection ])

  useEffect(() => {
    if (isAuth) {
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



  // useEffect(async () => {
  //   await axios.get(`${config.serverUrl}/api/offer/${adId}`).then(res => setAd(res.data))
  // }, [adId])

  return (
    <div className='homePage'>
      <HeaderNav />
      <div className="container">
        <div className='homePage__content'>
          <BtnsAccount isAuth={isAuth} />
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
            {isLoading && <DimmerLoader />}
            {nav !== 'favorites' && <AdvertList advertArr={ads} runAds={runAds} visitedAds={user.visitedAds} />}
            {nav === 'favorites' && <AdvertList advertArr={favoritesArr} visitedAds={user.visitedAds} />}
            {category !== 'favorites' && paginations.map((n, i) => (
              <Pagination
                {...n}
                totalPages={pages}
                onChange={page => updatePaginations(i, page)}
              />
            ))}
            <div className="mainContent__discounts">
              <SalesAds salesArr={salesAds} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
