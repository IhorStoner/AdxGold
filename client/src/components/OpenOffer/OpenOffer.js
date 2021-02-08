import React, { useState } from 'react'
import './OpenOffer.scss'
import Slider from '../Slider/Slider'
import mail from '../../assets/svg/mail.svg'
import phone from '../../assets/svg/phone.svg'
import photos from '../../assets/svg/photos.svg'
import documents from '../../assets/svg/documents.svg'
import SliderPopup from '../SliderPopup/SliderPopup'
import WarningPopup from '../WarningPopup/WarningPopup'
import avatarIcon from '../../assets/svg/avatar.svg'
import RecommendedAds from '../RecommendedAds/RecommendedAds'
import { useParams } from 'react-router-dom'
import {isOpenAd} from '../../redux/selectors/adsSelector'
import {useSelector} from 'react-redux'

export default function OpenOffer({ ad, setImgId, imgId }) {
  const [isWarningOpen, setIsWarningOpen] = useState(false) // false
  const [isShowNumber, setIsShowNumber] = useState(false)
  const [mailText, setMailText] = useState('')
  const { nav,adId } = useParams()
  const openAd = useSelector(isOpenAd)
  return (
    <div className='openOffer'>
      {isWarningOpen && <WarningPopup setIsOpenWarning={setIsWarningOpen} />}
      <div className="openOffer__content">
        <div className="openOffer__infoContainer">
          <div className="openOffer__offerData">
            <h2 className='openOffer__dataTitle'>Данные объявления<img className='openOffer__icon' src={documents} alt="mailIcon" /></h2>
            <div className="openOffer__dataContainer">
              <h2 className='openOffer__offerTitle'>{ad.title}</h2>
              <p className='openOffer__offerDescription'>{ad.description}</p>
            </div>
            <p className='openOffer__price'>Цена: {ad.productPrice} руб.</p>
          </div>
          <div className="openOffer__photoContainer">
            <h3 className='openOffer__dataTitle'>Фотографии <img className='openOffer__icon' src={photos} alt="mailIcon" /></h3>
            <div className="openOffer__sliderContainer">
                
                <div>
                  <div className='openOffer__slider' >
                  {adId === ad._id || openAd === ad._id ? <Slider onClickPhotos={() => setImgId(ad.img)} imgArr={ad.img} /> : null}
                  </div>
                  {imgId && (adId === ad._id || openAd === ad._id) ? <SliderPopup onClickPhoto={() => setImgId()} imgArr={ad.img} /> : null}
                </div>
              

            </div>
          </div>
        </div>
        <div className="openOffer__infoContainer">
          <div className='openOffer__descriptionOffer'>
            <h2 className='openOffer__dataTitle'>Описание объявления <img className='openOffer__icon' src={mail} alt="mailIcon" /></h2>
            <div className="openOffer__dataContainer openOffer__dataInfo">
              <div className="openOffer__dataColumn">
                <p className='openOffer__mainInfo'>Город: {ad.city}</p>
                <p className='openOffer__mainInfo'>Категория: <span className="openOffer__moreInfoText">{ad.section}</span></p>
                <p className='openOffer__mainInfo'>Подкатегория: <span className="openOffer__moreInfoText">{ad.subsection}</span></p>

                {/* Недвижимость */}
                {
                  nav === 'property' &&
                  <div>
                    {ad.fields && ad.fields.floor && <p className='openOffer__mainInfo'>Этаж: <span className="openOffer__moreInfoText">{ad.fields.floor}</span></p>}
                    {ad.fields && ad.fields.rooms && <p className='openOffer__mainInfo'>Комнат: <span className="openOffer__moreInfoText">{ad.fields.rooms}</span></p>}
                    {ad.fields && ad.fields.square && <p className='openOffer__mainInfo'>Площадь: <span className="openOffer__moreInfoText">{ad.fields.square}</span></p>}
                  </div>
                }

                {/* Авто */}

              </div>
              <div className="openOffer__dataColumn">
                {
                  nav === 'property' &&
                  <div>
                    {ad.fields && ad.fields.infrastucture && <p className='openOffer__mainInfo'>Инфраструктура: <span className="openOffer__moreInfoText">{ad.fields.infrastucture}</span></p>}
                    {ad.fields && ad.fields.stops && <p className='openOffer__mainInfo'>Остановки: <span className="openOffer__moreInfoText">{ad.fields.rooms}</span></p>}
                    {ad.fields && ad.fields.station && <p className='openOffer__mainInfo'>Станция: <span className="openOffer__moreInfoText">{ad.fields.station}</span></p>}
                    {ad.fields && ad.fields.metro && <p className='openOffer__mainInfo'>Метро: <span className="openOffer__moreInfoText">{ad.fields.metro}</span></p>}
                    {ad.fields && ad.fields.balcony && <p className='openOffer__mainInfo'>Балкон: <span className="openOffer__moreInfoText">{ad.fields.balcony}</span></p>}
                    {ad.fields && ad.fields.walls && <p className='openOffer__mainInfo'>Стены: <span className="openOffer__moreInfoText">{ad.fields.walls}</span></p>}
                  </div>
                }
              </div>
            </div>
          </div>
          <div className='openOffer__descriptionOffer '>
            <h3 className='openOffer__dataTitle'>Контактные данные <img className='openOffer__icon' src={phone} alt="mailIcon" /></h3>
            <div className="openOffer__dataContainer openOffer__dataContainer--padding">
              <p className='openOffer__moreInfo'>
                <img src={avatarIcon} alt="userAvatar" />
                <span className="openOffer__moreInfoText">{ad.name}</span>
                <span className="openOffer__moreInfoText">{!isShowNumber ? <button type='button' className='openOffer__showNumber' onClick={() => setIsShowNumber(true)}>Показать номер телефона</button> : ad.phone ? ad.phone : 'Номер не указан'}</span>
              </p>
              {/* <p className='openOffer__moreInfo'>Телефон: </p> */}
              <p className='openOffer__mailText'>
                <textarea className='openOffer__textArea' value={mailText} onChange={(e) => setMailText(e.target.value)} placeholder='Текст сообщения' />
              </p>
              <p className='openOffer__btnContainer'><button className='openOffer__btn' onClick={() => setIsWarningOpen(true)}>Отправить сообщение <img className='openOffer__icon' src={mail} alt="mailIcon" /></button></p>
            </div>
          </div>
        </div>
        <div className="openOffer__recommendOffers">
          <RecommendedAds />
        </div>
      </div>
    </div>
  )
}
