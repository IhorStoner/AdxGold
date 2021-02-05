import React, { useEffect, useState, useCallback, useContext } from 'react'
import './HomePage.scss'
import { useParams, useHistory } from 'react-router-dom'
import HeaderNav from '../../components/Header/Header'
import { useAuth } from '../../hooks/useAuth'
import { getAds, getSharesAds, getSalesAds, getRecommendedAds, getHotsAds, getRunsAds, getPages, getLoading, isOpenAd } from '../../redux/selectors/adsSelector';
import { useDispatch, useSelector } from 'react-redux'
import AdvertList from '../../components/AdvertList/AdvertList'
import { fetchAds, fetchSharesAds, fetchSalesAds, fetchRecommendedAds, fetchHotsAds, fetchRunAds } from '../../redux/actions/adsAction'
import SharesList from '../../components/SharesList/SharesList'
import SalesAds from '../../components/SalesAds/SalesAds'
import BtnsAccount from '../../components/BtnsAccount/BtnsAccount'
import BoardAdsBar from '../../components/BoardAdsBar/BoardAdsBar'
import { getCity, getSubsection, getSection, getModel } from '../../redux/selectors/filterSelector'
import Pagination from '../../components/Pagination/Pagination'
import Footer from '../../components/Footer/Footer'
import { fetchUser } from '../../redux/actions/userAction'
import { getUser, getFavoritesArr } from '../../redux/selectors/userSelector'
import DimmerLoader from '../../components/DimmerLoader/DimmerLoader'
import AuthPopup from '../../components/AuthPopup/AuthPopup'
import axios from 'axios'
import config from '../../config/default.json'
import { AuthContext } from '../../context/AuthContext';
import { isOpenAuthPopup } from '../../redux/selectors/authSelector'
import { setIsOpenAuthPopup } from '../../redux/actions/authAction'
import { model } from 'mongoose'

export default function HomePage() {
  const { nav } = useParams();
  const history = useHistory()
  const dispatch = useDispatch();
  const { token } = useAuth()
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
  const isOpenPopup = useSelector(isOpenAuthPopup)
  const selectedModel = useSelector(getModel)
  const [authError,setAuthError] = useState(false)
  const [selectedFilteredPrice, setSelectedFilteredPrice] = useState(null);
  const [selectedFilteredDate, setSelectedFilteredDate] = useState(null)
  const isLoading = useSelector(getLoading)

  //Pagination
  const [page, setPage] = useState(1)
  const [paginations, setPaginations] = useState([
    { totalPages: pages, currentPage: page }
  ]);
  const updatePaginations = (index, currentPage) => {
    setPaginations(paginations.map((n, i) => i === index ? { ...n, currentPage } : n));
    setPage(currentPage)
  }

  //popUp
  const [activeForm, setActiveForm] = useState('auth')
  const auth = useContext(AuthContext);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [successfulReg, setSuccessfulReg] = useState(false)
  //filterBySection
  const section = useSelector(getSection)
  const subsection = useSelector(getSubsection)

  // change eng nav to rus
  const [category, setCategory] = useState('')
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

  const onSubmitAuth = useCallback(async values => {
    const result = await axios.post(`${config.serverUrl}/api/auth`, values)
      .then(res => {
        auth.login(res.data.token, res.data.id)
        setSignInSuccess(true)
        dispatch(setIsOpenAuthPopup(false))
        history.push('/account/myOffers')
      })
      .catch(err => {
        setSignInSuccess(false)
        setAuthError(true)
      })
  }, [])

  const onSubmitReg = useCallback(async values => {
    await axios.post(`${config.serverUrl}/api/registration`, values).then(res => setSuccessfulReg(true)).catch(err => setAuthError(true))

  }, [])

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

  //load adsList
  useEffect(() => {
    setPage(1)
    setPaginations([{ totalPages: pages, currentPage: 1 }])
  }, [category])

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
        model: selectedModel,
      }))
    }
  }, [page, selectedCity, selectedFilteredPrice, selectedFilteredDate, category, section, subsection, selectedModel])

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchUser())
    }
  }, [isAuth])

  //load recommended ads for open offer
  const idOpenAd = useSelector(isOpenAd)
  useEffect(() => {
    if (idOpenAd) dispatch(fetchRecommendedAds())
  }, [idOpenAd])

  useEffect(() => {
    dispatch(fetchSharesAds())
    dispatch(fetchSalesAds())
    dispatch(fetchRecommendedAds())
    dispatch(fetchRunAds())
  }, []);


  return (
    <div className='homePage'>
      {isOpenPopup && <AuthPopup actionClose={setIsOpenAuthPopup} setAuthError={setAuthError} successfulReg={successfulReg} authError={authError} setSuccessfulReg={setSuccessfulReg} activeForm={activeForm} setActiveForm={setActiveForm} onSubmit={activeForm === 'auth' ? onSubmitAuth : onSubmitReg} />}
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
            {isLoading && <DimmerLoader />}
            {nav !== 'favorites' &&
              <div>
                {
                  pages === 'not found' ?
                    <div>По запросу ничего не найдено</div>
                    :
                    <AdvertList advertArr={ads} runAds={runAds} visitedAds={user.visitedAds} recommendedAds={recommendedAds} />
                }
              </div>

            }
            {nav === 'favorites' && <AdvertList advertArr={favoritesArr} visitedAds={user.visitedAds} />}
            {category !== 'favorites' && pages !== null && paginations.map((n, i) => (
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

/* <div className='filter'>
  { <Header as='h3'>Фильтр</Header>
  <Dropdown placeholder='Город' clearable search selection options={cityDataArr} onChange={(e) => setSelectedCity(e.target.innerText)} />
  <Dropdown placeholder='Цена' search selection options={optionFilterPrice} onChange={(e) => setSelectedFilteredPrice(e.target.innerText)} />  // filters
  <Dropdown p}laceholder='По дате' search selection options={optionFilterDate} onChange={(e) => setSelectedFilteredDate(e.target.innerText)} />
</div> */