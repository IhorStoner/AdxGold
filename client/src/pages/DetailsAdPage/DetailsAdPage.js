import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import axios from 'axios';
import config from '../../config/default.json'
import HeaderNav from '../../components/Header/Header'
import BtnsAccount from '../../components/BtnsAccount/BtnsAccount'
import BoardAdsBar from '../../components/BoardAdsBar/BoardAdsBar'
import './DetailsAdPage.scss'
import { useSelector, useDispatch } from 'react-redux';
import { getSharesAds } from '../../redux/selectors/adsSelector';
import SharesList from '../../components/SharesList/SharesList'
import OpenOffer from '../../components/OpenOffer/OpenOffer'
import { fetchSharesAds } from '../../redux/actions/adsAction'

export default function DetailsAdPage() {
  const { token, userId } = useAuth()
  const isAuth = !!token;
  const { adId } = useParams();
  const [ad, setAd] = useState([])
  const sharesAds = useSelector(getSharesAds)
  const [imgId, setImgId] = useState('')
  const dispatch = useDispatch()


  useEffect(async () => {
    dispatch(fetchSharesAds())
    await axios.get(`${config.serverUrl}/api/offer/${adId}`).then(res => setAd(res.data))
  }, [adId])

  return (
    <div className='detailsAdPage'>
      <HeaderNav />
      <div className="container">
        <div className='detailsAdPage__header'>
          <BtnsAccount isAuth={isAuth} />
          <BoardAdsBar />
        </div>
        <div className="detailsAdPage__content">
          <div className="dertailsAdPae__shares">
            <SharesList sharesArr={sharesAds} />
          </div>
          <div className='detailsAdPage__info' style={{ display: 'block' }}>
            {ad && <OpenOffer ad={ad} setImgId={setImgId} imgId={imgId} />}
          </div>
          {/* <AdvertItem ad={ad} /> */}
        </div>


      </div>
    </div>
  )
}
