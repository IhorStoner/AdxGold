import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import './RunAd.scss'

export default function RunAd({ runAds }) {
  const [selectedAd, setSelectedAd] = useState({})

  useEffect(() => {
    const randomAd = _.sample(runAds)
    setSelectedAd(randomAd)
  }, [runAds])

  

  return (
    <div className='runAd'>
      {
        selectedAd &&
        <Link to={`/detailsAd/${selectedAd._id}`}>
          {/* <marquee className='runAd__item'>
            {selectedAd.title} {selectedAd.description} {selectedAd.productPrice}руб.
          </marquee> */}
          <div class="b-marquee">
            <div class="b-marquee__text">{selectedAd.title}</div>
          </div>
        </Link>
      }

    </div>
  )
}
