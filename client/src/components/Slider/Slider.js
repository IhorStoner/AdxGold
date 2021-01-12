import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css'
import './Slider.scss'
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import config from '../../config/default.json'

SwiperCore.use([Navigation, Pagination, Autoplay])

export default function Slider({imgArr}) {

  return (
    <div className='sliderContainer'>
      <Swiper className='sliderImg'
        navigation
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
      {imgArr.map(img => <SwiperSlide><img src={`${config.serverUrl}/api/images/${img}`} className='sliderImg__slide' alt='sliderImg' width='400px'/></SwiperSlide>)}
        
      </Swiper>
    </div>
  )
}