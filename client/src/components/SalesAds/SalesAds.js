import React from 'react'
import './SalesAds.scss'
import { Link } from 'react-router-dom'
import logo from '../../assets/png/logo.png'
import config from '../../config/default.json'
import { useDispatch } from 'react-redux'
import { setIsOpenAd } from '../../redux/actions/adsAction'

export default function SalesAds({ salesArr }) {
  const dispatch = useDispatch()

  return (
    <div className='sales-ads'>
      <h2 className='sales-ads__title'>Скидки %</h2>
      <ul className='sales-ads__list'>
        {
          salesArr.map((ad, i) => (
            <li key={i} className='sales-ads__item'>
              <h3 className='sales-ads__item-title'>{ad.title}</h3>
              <div className="sales-ads__item-content">
                <p className="sales-ads__item-description">
                  {ad.description}
                </p>
                <img className="sales-ads__item-img" src={!ad.img[0] ? logo : `${config.serverUrl}/api/images/${ad.img[0]}`} />
              </div>
              <div className="sales-ads__item-link">
                <Link to={`/detailsAd/${ad._id}`} onClick={() => dispatch(setIsOpenAd(ad._id))}><span className="sales-ads__link-text" >Подробнее</span></Link>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
