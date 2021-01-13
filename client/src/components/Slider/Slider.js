import React from 'react'
import './Slider.scss'
import config from '../../config/default.json'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default function Slider({ imgArr, onClickPhotos }) {
  const zoomOutProperties = {
    duration: 10000000000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    // scale: 0.4,
    arrows: imgArr.length <= 1 ? false : true
  };
  console.log(imgArr.length)
  return (
    <div className="slide-container">
      <Fade {...zoomOutProperties} style={{width: "100%"}}>
        {imgArr.map((img,i) => (
          <div key={i} className="each-fade" >
            <div className="image-container" onClick={() => onClickPhotos(imgArr)}>
              <img src={`${config.serverUrl}/api/images/${img}`} style={{width: "100%"}}/>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  )
}