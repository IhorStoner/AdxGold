import React,{ useEffect, useState } from 'react'
import AdvertItem from '../../components/AdvertItem/AdvertItem'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import config from '../../config/default.json'

export default function DetailsAdPage() {
  const { adId } = useParams();
  const [ ad, setAd ] = useState([])

  useEffect(async () => {
    await axios.get(`${config.serverUrl}/api/offer/${adId}`).then(res => setAd(res.data))
    
  }, [adId])

  return (
    <div>
      <AdvertItem ad={ad}/>
    </div>
  )
}
