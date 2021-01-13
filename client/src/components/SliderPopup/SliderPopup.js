import React, { useState, useEffect } from 'react'
import config from '../../config/default.json'
import './SliderPopup.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

export default function SliderPopup({ imgArr, onClickPhoto }) {
  const [controlledSwiper, setControlledSwiper] = useState(null);

  return (
    <div className="fixed-overlay">
      <div className='modal'>
        <div className="modal_container">
          <div className="sliderPopup">
            <button className='sliderPopup__closeBtn' onClick={() => onClickPhoto('')}></button>
            <div className="slide-container">
              <Swiper // первый слайдер
                controller={{ control: controlledSwiper }}
                navigation
                slidesPerView={1}
              >
                {imgArr.map((img, i) => (
                  <SwiperSlide><img key={i} src={`${config.serverUrl}/api/images/${img}`} style={{ width: "100%" }} /></SwiperSlide>
                ))}
              </Swiper>
              {/* <Swiper  // сделал как в документации, но не работатет
                onSwiper={setControlledSwiper}
              >
                {imgArr.map((img, i) => (
                  <SwiperSlide key={`thumb-${i}`}><img className='sliderPopup__img' key={i} src={`${config.serverUrl}/api/images/${img}`} style={{ width: "240px" }}></img></SwiperSlide>
                ))}
              </Swiper> */}
            </div>
            <div className='sliderPopup__imgContainer' //свой вариант
            >
              {imgArr.map((img, i) => (
                <img className='sliderPopup__img' key={i} src={`${config.serverUrl}/api/images/${img}`} style={{ width: "240px" }}></img>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
