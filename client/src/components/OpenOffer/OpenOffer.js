import React from 'react'
import config from '../../config/default.json'
import './OpenOffer.scss'
import Slider from '../Slider/Slider'

export default function OpenOffer({ad,setImgId,imgId}) {
  return (
    <div className='openOffer'>
      <div className="openOffer__content">
        <div className="openOffer__infoContainer">
          <div className="openOffer__offerData">
            <h2 className='openOffer__dataTitle'>Данные объявления</h2>
            <div className="openOffer__dataContainer">
              <h2 className='openOffer__offerTitle'>{ad.title}</h2>
              <p className='openOffer__offerDescription'>{ad.description}</p>
            </div>
            <p className='openOffer__price'>Цена: {ad.productPrice} руб.</p>
          </div>
          <div className="openOffer__photoContainer">
            <h3 className='openOffer__dataTitle'>Фотографии:</h3>
            <div className="openOffer__offerData">
              {/* <Slider imgArr={ad.img}/> */}
              <div>
                {ad.img.map(img => (
                  <div onClick={() => setImgId(img)}>
                    <img src={`${config.serverUrl}/api/images/${img}`} width='500'/>
                  </div>
                ))}
              </div>
              {
                imgId &&
                <div className="fixed-overlay" onClick={() => setImgId('')}>
                  <div className='modal'>
                    <div className="modal_container">
                      <img className='adsList__popupImg' src={`${config.serverUrl}/api/images/${imgId}`} width='500' />
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
            <p><button>Отправить сообщение</button></p>
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
