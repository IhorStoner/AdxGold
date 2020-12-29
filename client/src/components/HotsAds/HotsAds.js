import React from 'react'
import { Link } from 'react-router-dom'

export default function HotsAds({ hotsAds }) {

  return (
    <ul className='shares-list'>
      {hotsAds.map(ad => (
        <li className='shares-list__item'><Link to={`/detailsAd/${ad._id}`}>{ad.title} {ad.type} {ad.productPrice}$ </Link></li>
      ))}
    </ul>
  )
}
