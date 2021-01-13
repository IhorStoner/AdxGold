import React from 'react'
import config from '../../config/default.json'
import './OpenOffer.scss'
import Slider from '../Slider/Slider'
import mail from '../../assets/svg/mail.svg'
import phone from '../../assets/svg/phone.svg'
import photos from '../../assets/svg/photos.svg'
import documents from '../../assets/svg/documents.svg'
import SliderPopup from '../SliderPopup/SliderPopup'
import logo from '../../assets/png/logo.png'

export default function OpenOffer({ ad, setImgId, imgId }) {
  return (
    <div className='openOffer'>
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
              <div className='openOffer__slider' >
                <Slider onClickPhotos={() => setImgId(ad.img)} imgArr={ad.img} />
              </div>
              {
                imgId && <SliderPopup onClickPhoto={() => setImgId()} imgArr={ad.img} />
              }
            </div>
          </div>
        </div>
        <div className="openOffer__infoContainer">
          <div className='openOffer__descriptionOffer'>
            <h2 className='openOffer__dataTitle'>Описание объявления <img className='openOffer__icon' src={mail} alt="mailIcon" /></h2>
            <div className="openOffer__dataContainer">
              <p className='openOffer__mainInfo'>Город: {ad.city}</p>
              <p className='openOffer__mainInfo'>Вид сделки:</p>
              <p className='openOffer__mainInfo'>Тип: {ad.type}</p>
              <p className='openOffer__moreInfo'>Категория: <span className="openOffer__moreInfoText">{ad.section}</span></p>
              <p className='openOffer__moreInfo'>Подкатегория: <span className="openOffer__moreInfoText">{ad.subsection}</span></p>
            </div>
          </div>
          <div className='openOffer__descriptionOffer'>
            <h3 className='openOffer__dataTitle'>Контактные данные <img className='openOffer__icon' src={phone} alt="mailIcon" /></h3>
            <div className="openOffer__dataContainer">
              <p className='openOffer__moreInfo'>Имя: <span className="openOffer__moreInfoText">{ad.name}</span></p>
              <p className='openOffer__moreInfo'>Телефон: <span className="openOffer__moreInfoText">{ad.phone}</span></p>
              <p className='openOffer__moreInfo'>Эл.почта: <span className="openOffer__moreInfoText">{ad.email}</span></p>
              <p className='openOffer__btnContainer'><button className='openOffer__btn'>Отправить сообщение <img className='openOffer__icon' src={mail} alt="mailIcon" /></button></p>
            </div>
          </div>
        </div>
        {/* {recommendedAds &&
								<div className='recommended-ads'>
									<Header>Рекомендуемые</Header>
									<RecomendedAds recommendedAds={recommendedAds} />
								</div>
							} */}
      </div>
      {/* {
							hotsAds &&
							<div className="adsList__content adsList__hots">
								<Header as='h2'>Горячие</Header>
								<HotsAds hotsAds={hotsAds} />
							</div>
						} */}
    </div>
  )
}
