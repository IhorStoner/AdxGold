import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import './RunAd.scss'
import { useDispatch } from 'react-redux'
import {setIsOpenAd} from '../../redux/actions/adsAction'

export default function RunAd({ runAds }) {
  const [selectedAd, setSelectedAd] = useState({})
  const dispatch = useDispatch()
  useEffect(() => {
    const randomAd = _.sample(runAds)
    setSelectedAd(randomAd)
  }, [runAds])

  

  return (
    <div className='runAd'>
      {
        selectedAd &&
        <Link to={`/detailsAd/${selectedAd._id}`} onClick={() => dispatch(setIsOpenAd(selectedAd._id))}>
          <div class="b-marquee">
            <div class="b-marquee__text">{selectedAd.title}</div>
          </div>
        </Link>
      }

    </div>
  )
}
