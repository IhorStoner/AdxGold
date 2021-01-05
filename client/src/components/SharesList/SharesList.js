import React from 'react'
import './SharesList.scss'
import { Link } from 'react-router-dom'
import config from '../../config/default.json'
import logo from '../../assets/png/logo.png'

export default function SharesList({ sharesArr }) {
  return (
    <div className='sharesAds sharesAds--mr'>
      <h2 className='sharesAds__title'>Акции %</h2>
      <ul className='sharesAds__list'>
        {sharesArr.map(ad => (
          <li className='sharesAds__item'>
            <h2 className="sharesAds__itemTitle">{ad.title}</h2>
            <div className="sharesAds__contentContainer">
              <img className='sharesAds__img' src={!ad.img[0] ? logo : `${config.serverUrl}/api/images/${ad.img[0]}`} alt={ad.title} />
              <p className='sharesAds__itemDescription'>{ad.description}</p>
            </div>
            <div className="sharesAds__linkContainer">
              <Link  to={`/detailsAd/${ad._id}`}><span className='sharesAds__link'>Подробнее</span></Link>
            </div> 
          </li>
        ))}
      </ul>
    </div>

  )
}
