import React,{useState} from 'react'
import { Container } from 'semantic-ui-react'
import config from '../../config/default.json'
import { Carousel } from 'react-responsive-carousel';
import { Button } from 'semantic-ui-react'

export default function AdvertItem({ ad }) {
  const [imgId, setImgId] = useState('')

  return (
    <Container>
      <div className='adsList__info'>
        <div className="adsList__infoContainer">
          <div className="adsList__titleContainer">
            <h2>{ad.title}</h2>
            <p>{ad.description}</p>
          </div>
          <div className="adsList__photoContainer">
            <h3>Фото:</h3>
            <div className="adsList__sliderContainer">
              <Carousel >
                {ad.img && ad.img.map((img,i) => (
                  <div key={i} onClick={() => setImgId(img)}>
                    <img src={`${config.serverUrl}/api/images/${img}`} />
                  </div>
                ))}
              </Carousel>
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
            <p><Button>Отправить сообщение</Button></p>
          </div>
        </div>
      </div>
    </Container>
  )
}
