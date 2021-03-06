import React, { useEffect, useState} from 'react'
import { useHistory } from "react-router-dom"
import { useAuth } from '../../hooks/useAuth'
import axios from 'axios'
import config from '../../config/default.json'
import AdvertList from '../../components/AdvertList/AdvertList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../redux/actions/userAction'
import { getUser, getUserLoading } from '../../redux/selectors/userSelector'
import HomePage from '../HomePage/HomePage'
import HeaderNav from '../../components/Header/Header'
import AccountNavbar from '../../components/AccountNavbar/AccountNavbar'
import MyOfferItem from '../../components/MyOfferItem/MyOfferItem'
import './AccountPage.scss'
import SubmitPopup from '../../components/SubmitPopup/SubmitPopup'
import AccountSettings from '../../components/AccountSettings/AccountSettings'
import EditAd from '../../components/EditAd/EditAd'
import NewOfferForm from '../../components/NewOfferForm/NewOfferForm'
import {useParams} from 'react-router-dom'
import DimmerLoader from '../../components/DimmerLoader/DimmerLoader'

export default function AccountPage() {
  const { token, logout } = useAuth()
  const isAuth = !!token;
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(getUser)
  const [isLoading,setIsLoading] = useState(true)
  // useSelector(getUserLoading)
  const [ads, setAds] = useState([])

  const [submitPopup, setSubmitPopup] = useState('')
  const [activeNav, setActiveNav] = useState('')
  const [editAdId, setEditAdId ] = useState('')
  const { accountNav } = useParams()

  useEffect(() => {
   setActiveNav(accountNav)
  }, [accountNav])
  
  useEffect(() => {
    if (isAuth) {
      dispatch(fetchUser())
    }
  }, [isAuth])


  // обьявления
  useEffect(() => {
    if (isAuth) {
      const result = user.ads && axios.post(`${config.serverUrl}/api/offer/getAdverts`, user.ads).then(res => {
        setIsLoading(false)
        setAds(res.data)
      })
    }
  }, [user])

  const handleLogout = () => {
    logout()
    history.push('/home')
    window.location.reload()
  }

  const deleteSelectedAd = async (ad) => {
    const promiseImg = ad.img.map(imgName  => {
      return axios.delete(`${config.serverUrl}/api/images/${imgName}`)
    })
    await Promise.resolve(promiseImg)
    
    const deleteInAdModel = await axios.delete(`${config.serverUrl}/api/offer/${ad._id}`).then(
      res => res.data)

    const deleteInUserModel = await axios.put(`${config.serverUrl}/api/users/deleteAd/${user._id}/${ad._id}`).then(
      res => {
        setSubmitPopup('')
        dispatch(fetchUser())
      })
  };

  if (isAuth) {
    return (
      <div className='accountPage'>
        {submitPopup && submitPopup !== 'exit' &&
          <SubmitPopup
            text='Вы точно хотите удалить объявление?'
            subtext='Это объявление будет немедленно удалено. Данные необратимы.'
            btnNoText='Отменить'
            btnOkText='Удалить'
            setSubmitPopup={setSubmitPopup}
            ad={submitPopup}
            btnOkAction={deleteSelectedAd}
          />}
        {submitPopup === 'exit' &&
          <SubmitPopup
            text='Вы действительно хотите выйти? '
            btnNoText='Отмена'
            btnOkText='Выйти'
            setSubmitPopup={setSubmitPopup}
            btnOkAction={handleLogout}
          />}
        <HeaderNav />
        <div className="container">
          <div className="accountPage__accountNavbar">
            <AccountNavbar user={user} isAuth={isAuth} activeNav={activeNav} setSubmitPopup={setSubmitPopup}  setEditAdId={setEditAdId}/>
          </div>
          <div className="accountPage__content">
            {!editAdId && activeNav === 'newOffer' &&
              <div className="accountPage__newAd">
                <NewOfferForm/>
              </div>
            }
         
            {!editAdId && activeNav === 'myOffers' && ads &&
              <div className="accountPage__offersList">
                {isLoading && <DimmerLoader />}
                {ads.map(ad => <MyOfferItem ad={ad} setSubmitPopup={setSubmitPopup} setEditAdId={setEditAdId}/>)}
              </div>
            }
            {!editAdId && activeNav === 'favorites' && ads &&
              <div className="accountPage__offersList">
                {user.favoritesArr && <AdvertList advertArr={user.favoritesArr} />}
              </div>
            }
            {!editAdId && activeNav === 'settings' && ads &&
              <div className="accountPage__offersList">
                <AccountSettings/>
              </div>
            }
            {
              editAdId &&
              <div className="accountPage__newAd">
                <EditAd ad={editAdId} setEditAdId={setEditAdId}/>
              </div>
            }
          </div>
        </div>
      </div>

    )
  }

  return (
    <div> 
      <HomePage />
    </div>
  )
}
