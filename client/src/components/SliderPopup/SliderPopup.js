import React, { useState, useEffect,useCallback } from 'react'
import config from '../../config/default.json'
import './SliderPopup.scss'
import { useEmblaCarousel } from "embla-carousel/react";
import { Thumb } from "./EmblaCarouselThumb";
// import { mediaByIndex } from "../media";
import "./embla.css";

const viewportCss = {
  overflow: 'hidden',
}
const containerCss = {
  display: 'flex',
}
const slideCss = {
  position: 'relative',
  minWidth: '100%',
}

export default function SliderPopup({ imgArr, onClickPhoto }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel();
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    selectedClass: ""
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);



  return (
    <div className="fixed-overlay">
      <div className='modal'>
        <div className="modal_container">
          <div className="sliderPopup">
            <button className='sliderPopup__closeBtn' onClick={() => onClickPhoto('')}></button>
            <div className="slide-container">
              <div className="embla">
                <div className="embla__viewport" ref={mainViewportRef}>
                  <div className="embla__container">
                    {imgArr.map((img,index) => (
                      <div className="embla__slide" key={index}>
                        <div className="embla__slide__inner">
                          <img
                            className="embla__slide__img"
                            src={`${config.serverUrl}/api/images/${img}`}
                            alt="sliderImg"
                            style={{ width: "100%",height:'100%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="embla embla--thumb">
                <div className="embla__viewport" ref={thumbViewportRef}>
                  <div className="embla__container embla__container--thumb">
                    {imgArr.map((img,index) => (
                      <Thumb
                        onClick={() => onThumbClick(index)}
                        selected={index === selectedIndex}
                        imgSrc={`${config.serverUrl}/api/images/${img}`}
                        
                        key={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* <div style={viewportCss} ref={emblaRef}>
                <div style={containerCss}>
                  {imgArr.map((img, i) => (
                    <div style={slideCss}><img key={i} src={`${config.serverUrl}/api/images/${img}`} style={{ width: "100%" }} /></div>
                  ))}
                </div>
              </div> */}
              {/* <Swiper // первый слайдер
                controller={{ control: controlledSwiper }}
                navigation
                slidesPerView={1}
                onActiveIndexChange={2}
              >

              </Swiper> */}
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
              {/* {imgArr.map((img, i) => (
                <img className='sliderPopup__img' key={i} src={`${config.serverUrl}/api/images/${img}`} style={{ width: "240px" }}></img>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
