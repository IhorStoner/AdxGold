import React from 'react'
import './RecommendedAds.scss'
import { Link } from 'react-router-dom'
import { getRecommendedAds } from '../../redux/selectors/adsSelector'
import { useSelector } from 'react-redux'
import config from '../../config/default.json'
import logo from '../../assets/png/logo.png'
import fire from '../../assets/svg/fire.svg'

export default function RecommendedAds() {
  const recommendedAds = useSelector(getRecommendedAds)

  return (
    <div className='RecOffers' >
      <h2 className='RecOffers__title'>
        Рекомендованные
        <img src={fire} alt="fire"/>
      </h2>
      <ul className='RecOffers__list'>
        {
          recommendedAds.map((ad, i) => (
            <li key={i} className='RecOffers__item'>
              <h3 className='RecOffers__item-title'>{ad.title}</h3>
              <div className="RecOffers__item-content">
                <p className="RecOffers__item-description">
                  {ad.description}
                </p>
                <img className="RecOffers__item-img" src={!ad.img[0] ? logo : `${config.serverUrl}/api/images/${ad.img[0]}`} />
              </div>
              <div className="RecOffers__item-link">
                <Link to={`/detailsAd/${ad._id}`}><span className="RecOffers__link-text">Подробнее</span></Link>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
