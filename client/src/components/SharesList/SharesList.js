import React from 'react'
import './SharesList.scss'
import { Link } from 'react-router-dom'
import config from '../../config/default.json'
import logo from '../../assets/png/logo.png'
import {useDispatch} from 'react-redux'
import {setIsOpenAd} from '../../redux/actions/adsAction'

export default function SharesList({ sharesArr }) {
  const  dispatch = useDispatch()
  
  return (
    <div className='sharesAds sharesAds'>
      <h2 className='sharesAds__title'>Акции %</h2>
      <ul className='sharesAds__list'>
        {sharesArr.map(ad => (
          <li key={ad._id} className='sharesAds__item'>
            <h2 className="sharesAds__itemTitle">{ad.title}</h2>
            <div className="sharesAds__contentContainer">
              {/* div.shares */}
              <img className='sharesAds__img' src={!ad.img[0] ? logo : `${config.serverUrl}/api/images/${ad.img[0]}`} alt={ad.title} />
              <p className='sharesAds__itemDescription'>{ad.description}</p>
            </div>
            <div className="sharesAds__linkContainer">
              <Link  to={`/detailsAd/${ad._id}`} onClick={() => dispatch(setIsOpenAd(ad._id))}><span className='sharesAds__link'>Подробнее</span></Link>
            </div> 
          </li>
        ))}
      </ul>
    </div>

  )
}
