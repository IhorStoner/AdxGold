import React from 'react'
import './SharesList.scss'
import { Link } from 'react-router-dom'

export default function SharesList({ sharesArr }) {
  return (
    <ul className='shares-list'>
      {sharesArr.map(ad => (
          <li className='shares-list__item'><Link to={`/detailsAd/${ad._id}`}>{ad.title} {ad.type} {ad.productPrice}$ </Link></li>
      ))}
    </ul>
  )
}
