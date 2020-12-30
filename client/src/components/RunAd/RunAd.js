import React,{useEffect, useState} from 'react'
import _ from 'lodash'
import {Link} from 'react-router-dom'
export default function RunAd({runAds}) {
  const [ selectedAd, setSelectedAd ] = useState(() => _.sample(runAds))
 
  useEffect(() => {
    const randomAd = _.sample(runAds)
    setSelectedAd(randomAd)
  }, [runAds])

  return (
    <div>
      {
        selectedAd &&
        <marquee><Link to={`/detailsAd/${selectedAd._id}`}>{selectedAd.title} {selectedAd.productPrice}$ </Link></marquee>
      }
      
    </div>
  )
}
