import React, { useEffect, useState } from 'react'
import { fetchAds, openInfo } from '../../redux/actions/adsAction'
import { Button } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { getAds, getGoldAds, getSilverAds, getCommonAds } from '../../redux/selectors/adsSelector';
import './AdsList.scss'
import config from '../../config/deafult.json'
import logo from '../../assets/png/logo.png'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function AdsList() {
  const dispatch = useDispatch();
  const [isOpenInfo, setIsOpenInfo] = useState('')
  const ads = useSelector(getAds);
  const goldAds = useSelector(getGoldAds)
  const silverAds = useSelector(getSilverAds)
  const commonAds = useSelector(getCommonAds)
  const [imgId, setImgId] = useState('')
  useEffect(() => {
    dispatch(fetchAds())
  }, []);

  return (
    <ul className='adsList'>
      {goldAds.map((ad, i) => (
        <div>
          <li className={`adsList__item ${ad.status}`} key={i} onClick={() => setIsOpenInfo(ad._id)}>
            <span>{ad.city} </span>
            <span><img src={!ad.img[0] ? logo : `${config.serverUrl}/api/images/${ad.img[0]}`} width='50' height='50' /></span>
            <span>{ad.title} </span>
            <span>{ad.type} </span>
            <span>{ad.date} </span>
            <span>{ad.productPrice}$ </span>
          </li>
          <div className='adsList__info' style={isOpenInfo === ad._id ? { display: 'block' } : { display: 'none' }}>
            <div className="adsList__infoContainer">
              <div className="adsList__titleContainer">
                <h2>{ad.title}</h2>
                <p>{ad.description}</p>
              </div>
              <div className="adsList__photoContainer">
                <h3>Фото:</h3>
                <div className="adsList__sliderContainer">
                  <Carousel >
                    {ad.img.map(img => (
                      <div onClick={() => setImgId(img)}>
                        <img src={`${config.serverUrl}/api/images/${img}`} />
                      </div>
                    ))}
                  </Carousel>
                  {
                    imgId &&
                    <div className="fixed-overlay" onClick={() => setImgId('')}>
                      <div className='modal'>
                        <div className="modal_container">
                          <img className='adsList__popupImg' src={`${config.serverUrl}/api/images/${imgId}`} width='500'/>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="adsList__infoContainer">
              <div>
                <h2>Данные объявление</h2>
                <p>{ad.city}</p>
                <p>Тип{ad.type}</p>
                <p>{ad.section}</p>
                <p>{ad.subsection}</p>
                <p>Цена: {ad.productPrice}</p>
              </div>
              <div>
                <h3>Контакты:</h3>
                <p>Имя: {ad.name}</p>
                <p>Телефон: {ad.phone}</p>
                <p><Button>Отправить сообщение</Button></p>
              </div>
            </div>
          </div>
        </div>
      ))}
      {silverAds.map((ad, i) => (
        <div>
          <li className={`adsList__item ${ad.status}`} key={i} onClick={() => setIsOpenInfo(ad._id)}>
            <span>{ad.city} </span>
            <span>
              {!ad.img[0] ?
                <img src={logo} width='50' height='50'></img>
                :
                <img src={`${config.serverUrl}/api/images/${ad.img[0]}`} width='50' height='50' />
              }

            </span>
            <span>{ad.title} </span>
            <span>{ad.type} </span>
            <span>{ad.date} </span>
            <span>{ad.productPrice}$</span>
          </li>
          <div className='adsList__info' style={isOpenInfo === ad._id ? { display: 'block' } : { display: 'none' }}>
            <div className="adsList__infoContainer">
              <div className="adsList__titleContainer">
                <h2>{ad.title}</h2>
                <p>{ad.description}</p>
              </div>
              <div className="adsList__photoContainer">
                <h3>Фото:</h3>
                <div className="adsList__sliderContainer">
                  <Carousel >
                    {ad.img.map(img => (
                      <div onClick={() => setImgId(img)}>
                        <img src={`${config.serverUrl}/api/images/${img}`} />
                      </div>
                    ))}
                  </Carousel>
                  {
                    imgId &&
                    <div className="fixed-overlay" onClick={() => setImgId('')}>
                      <div className='modal'>
                        <div className="modal_container">
                          <img className='adsList__popupImg' src={`${config.serverUrl}/api/images/${imgId}`} width='500'/>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="adsList__infoContainer">
              <div>
                <h2>Данные объявление</h2>
                <p>{ad.city}</p>
                <p>Тип{ad.type}</p>
                <p>{ad.section}</p>
                <p>{ad.subsection}</p>
                <p>Цена: {ad.productPrice}</p>
              </div>
              <div>
                <h3>Контакты:</h3>
                <p>Имя: {ad.name}</p>
                <p>Телефон: {ad.phone}</p>
                <p><Button>Отправить сообщение</Button></p>
              </div>
            </div>
          </div>
        </div>
      ))}
      {commonAds.map((ad, i) => (
        <div>
          <li className={`adsList__item ${ad.status}`} key={ad._id} onClick={() => setIsOpenInfo(ad._id)}>
            <span>{ad.city} </span>
            <span><img src={`${config.serverUrl}/api/images/${ad.img[0]}`} width='50' height='50' /></span>
            <span>{ad.title} </span>
            <span>{ad.type} </span>
            <span>{ad.date} </span>
            <span>{ad.productPrice}$</span>
          </li>
          <div className='adsList__info' style={isOpenInfo === ad._id ? { display: 'block' } : { display: 'none' }}>
            <div className="adsList__infoContainer">
              <div className="adsList__titleContainer">
                <h2>{ad.title}</h2>
                <p>{ad.description}</p>
              </div>
              <div className="adsList__photoContainer">
                <h3>Фото:</h3>
                <div className="adsList__sliderContainer">
                  <Carousel >
                    {ad.img.map(img => (
                      <div onClick={() => setImgId(img)}>
                        <img src={`${config.serverUrl}/api/images/${img}`} />
                      </div>
                    ))}
                  </Carousel>
                  {
                    imgId &&
                    <div className="fixed-overlay" onClick={() => setImgId('')}>
                      <div className='modal'>
                        <div className="modal_container">
                          <img className='adsList__popupImg' src={`${config.serverUrl}/api/images/${imgId}`} width='500'/>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="adsList__infoContainer">
              <div>
                <h2>Данные объявление</h2>
                <p>{ad.city}</p>
                <p>Тип{ad.type}</p>
                <p>{ad.section}</p>
                <p>{ad.subsection}</p>
                <p>Цена: {ad.productPrice}</p>
              </div>
              <div>
                <h3>Контакты:</h3>
                <p>Имя: {ad.name}</p>
                <p>Телефон: {ad.phone}</p>
                <p><Button>Отправить сообщение</Button></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </ul>
  )
}
