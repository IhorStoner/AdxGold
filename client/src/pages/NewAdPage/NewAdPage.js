import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import './NewAdPage.scss'
import * as category from '../../assets/json/category.json'
import * as cityData from '../../assets/json/russian-cities.json'
import { useHistory } from 'react-router-dom'
import config from '../../config/default.json'
import _ from 'lodash'
import Liqpay from '../../components/Liqpay/Liqpay'
import HeaderNav from '../../components/Header/Header'
import BtnsAccount from '../../components/BtnsAccount/BtnsAccount'
import BoardAdsBar from '../../components/BoardAdsBar/BoardAdsBar'
import { useAuth } from '../../hooks/useAuth'
import SharesList from '../../components/SharesList/SharesList'
import { useDispatch, useSelector } from 'react-redux'
import { getSharesAds } from '../../redux/selectors/adsSelector'
import { fetchSharesAds } from '../../redux/actions/adsAction'
import MyDropdown from '../../components/MyDropdown/MyDropdown'
import DimmerLoader from '../../components/DimmerLoader/DimmerLoader'

export default function NewAdPage() {
  const { token, userId } = useAuth()
  const isAuth = !!token;
  const dispatch = useDispatch();
  const sharesAds = useSelector(getSharesAds)
  //раздел
  const [section, setSection] = useState('Аудио,Видео,ТВ,Фото')
  const [stateSection, setStateSection] = useState(() => JSON.parse(JSON.stringify(category.default)))
  const [cityDataArr, setCityDataArr] = useState(() => JSON.parse(JSON.stringify(cityData.default)))
  const [uniqueSubject, setUniqueSubject] = useState(() => {
    const popularCity = [];
    cityDataArr.map(item => {
      if (item.population >= 500000) {
        popularCity.push(item)
      }
    })
    const dataUnique = new Map();
    popularCity.map((item) => dataUnique.set(item.subject, item.subject));
    const uniqueArr = [];
    dataUnique.forEach((item, i) => {
      uniqueArr.push({ key: i, text: item, value: item })
    })
    return uniqueArr
  })
  const [selectedRegion, setSelectedRegion] = useState('')
  const [subsection, setSubsection] = useState([])
  const [cityArr, setCityArr] = useState([])
  const [selectedSubsection, setSelectedSubsection] = useState('')
  const [type, setType] = useState('')
  const [city, setCity] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [price, setPrice] = useState(0)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [mail, setMail] = useState('')
  const [status, setStatus] = useState('common')
  const [result, setResult] = useState({})
  const [serviceArr, setServiceArr] = useState([])
  const [images, setImages] = useState([])
  const [imgNames, setImgNames] = useState([])
  const [days, setDays] = useState(1)
  const [isLodaing, setIsLoading ] = useState(false)
  const history = useHistory();

  const typeAdConfig = [
    { key: 1, text: 'Покупка', value: 'Покупка' },
    { key: 2, text: 'Продажа', value: 'Продажа' },
    { key: 3, text: 'Аренда', value: 'Аренда' }
  ]

  const optionsSection = Object.keys(stateSection).map((item, i) => {
    return { key: i, text: item, value: item }
  })

  useEffect(() => {
    section && setSubsection(stateSection[section].map((item, i) => {
      return { key: i, text: item, value: item }
    }))
  }, [section])

  //Город
  useEffect(() => {
    const filteredCity = cityDataArr.filter(item => item.population > 500000)
    const optionsCity = filteredCity.map((item, i) => {
      return { key: i, text: item.name, value: item.name }
    })
    setCityArr(optionsCity)
  }, [selectedRegion])

  // подготовка данных формы для отправки
  useEffect(() => {
    setResult({
      section: section,
      subsection: selectedSubsection,
      type: type,
      // region: selectedRegion,
      city: city,
      productPrice: productPrice,
      priceAd: price,
      title: title,
      description: description,
      name: name,
      phone: phone,
      mail: mail,
      status: status,
      services: serviceArr,
    })
  }, [section, selectedSubsection, type, selectedRegion, city, price, title, description, name, phone, mail, status, serviceArr, productPrice, imgNames, images])

  useEffect(() => {
    dispatch(fetchSharesAds())
  }, []);

  async function wrap(ev, cb) {
    const btn = ev.target;

    ev.preventDefault();
    btn.setAttribute('disabled', true);

    const formData = getFormData();
    let json;
    try {
      json = await cb(formData);
    } catch (err) {
      console.error(err);
    }

    btn.removeAttribute('disabled');
    return json
  }


  function getFormData() {
    const formEl = document.getElementById('exampleForm');
    const formData = new FormData(formEl);
    for (const key of formData.keys()) {
      const val = formData.get(key);
      if (val === undefined || val === null || (typeof val === 'string' && !/\S/.test(val))) {
        formData.delete(key);
      }
    }

    return formData;
  }
  /// сохранение картинок
  async function submitAxios(ev) {
    
    return wrap(ev, async (formData) => {
      const { data } = await axios.post(
        `${config.serverUrl}/api/images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          }
        }
      )//.then(res => setImgNames(res.data))

      return data;
    });
  }

  const onChangeGold = (ev) => {
    ev.preventDefault()
    if (status !== 'gold') {
      setPrice(() => {
        if (status === 'silver') {
          return price + 50 - 25
        } else {
          return price + 50
        }
      })
      setStatus('gold')
    } else {
      setPrice(price - 50)
      setStatus('common')
    }
  }

  const onChangeSilver = (ev) => {
    ev.preventDefault()
    if (status !== 'silver') {
      setPrice(() => {
        if (status === 'gold') {
          return price + 25 - 50
        } else {
          return price + 25
        }
      })
    } else {
      setPrice(price - 25)
      setStatus('common')
    }
    status !== 'silver' ? setStatus('silver') : setStatus('common')
  }


  const onChangeService = (ev, service) => {
    ev.preventDefault()
    if (serviceArr.includes(service)) {
      const newServiceArr = serviceArr.filter(item => item !== service)
      setServiceArr(newServiceArr)
      setPrice(price - 30)
    } else {
      setServiceArr([...serviceArr, service])
      setPrice(price + 30)
    }
  }

  const onSubmit = useCallback(async (ev) => {
    setIsLoading(true)
    ev.preventDefault()
    const resultImg = await submitAxios(ev);
    let finnalyData = result;
    finnalyData.img = resultImg

    const adId = await axios.post(`${config.serverUrl}/api/offer`, finnalyData)
      .then(res => res.data._id)

    const user = JSON.parse(localStorage.getItem('userData')).userId
    const userAds = await Promise.resolve(axios.get(`${config.serverUrl}/api/users/${user}`))

    const adsArr = [...userAds.data.ads, adId]
    const saveInUser = await axios.put(`${config.serverUrl}/api/users/newOffer/${user}`, adsArr).then(res => history.push('/home'))

  }, [result])

  return (
    <div className='newAd'>
      <HeaderNav />
      <div className='container'>
        <div className="newAd__header">
          <BtnsAccount isAuth={isAuth} />
          <BoardAdsBar />
        </div>
        <div className='newAd__content'>
          <div className="ads__shares">
            <SharesList sharesArr={sharesAds} />
          </div>
          <form className="offerForm" method="post" enctype="multipart/form-data" id='exampleForm'>
            <div className="offerForm__content">
              <div className="offerForm__data offerForm__item">
                <h2 className='offerForm__title'>Данные объявление</h2>
                <div className="offerForm__itemContent">
                  <h3 className='offerForm__text'>Заголовок</h3>
                  <input type="text" className='offerForm__input' onChange={(e) => setTitle(e.target.value)} />
                  <p className='offerForm__text'>Описание</p>
                  <textarea className='offerForm__descriptionInput' onChange={(e) => setDescription(e.target.value)} />
                  <div className='offerForm__priceContainer'>
                    <p className='offerForm__priceText'>Цена:</p>
                    <input type="text" className='offerForm__input offerForm__input--priceInput' onChange={(e) => setProductPrice(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="offerForm__img offerForm__item">
                <h2 className='offerForm__title'>Фото</h2>
                <div className="offerForm__itemContent offerForm__images">
                  <label className='offerForm__labelFile offerForm__imgItem' for="uploadImg">Добавить<br />Фото</label>
                  <input type="file" name="slider" onChange={(e) => setImages(e.target.files)} class="offerForm__inputFile" id="uploadImg" accept="image/*" multiple />
                  {[...images].map((file, i) => (
                    <img src={URL.createObjectURL(file)} className='offerForm__imgItem' width='150' height='150'></img>
                  ))}
                </div>
              </div>
            </div>
            <div className="offerForm__content">
              <div className="offerForm__info offerForm__item">
                <h2 className='offerForm__title'>Добавить новое объявление</h2>
                <div className="offerForm__itemContent">
                  <MyDropdown className='offerForm__dropdown' arr={optionsSection} placeholder='Раздел' onChange={(e) => setSection(e.target.innerText)} />
                  <MyDropdown placeholder='Подраздел' arr={subsection} onChange={(e) => setSelectedSubsection(e.target.innerText)} />
                  <MyDropdown placeholder='Тип' arr={typeAdConfig} onChange={(e) => setType(e.target.innerText)} />
                  <MyDropdown clearable placeholder='Город' arr={cityArr} onChange={(e) => setCity(e.target.innerText)} />
                </div>
              </div>
              <div className="offerForm__contacts offerForm__item">
                <h2 className='offerForm__title '>Контакты</h2>
                <div className="offerForm__itemContent offerForm__contactsContent">
                  <div className='offerForm__contactsContainer'>
                    <p className='offerForm__text'>Имя</p>
                    <input type="text" className='offerForm__input offerForm__contactInput' placeholder='Добавить имя' onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className='offerForm__contactsContainer'>
                    <p className='offerForm__text'>Телефон</p>
                    <input type="text" className='offerForm__input offerForm__contactInput' placeholder='Укажите телефон' onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className='offerForm__contactsContainer'>
                    <p className='offerForm__text'>Эл.почта</p>
                    <input type="text" className='offerForm__input offerForm__contactInput' placeholder='Укажите почту' onChange={(e) => setMail(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
            <div className='offerForm__content'>

              <div className="offerForm__btns">
                <div className="offerForm__moreService">
                  <h3 className='offerForm__serviceTitle'>Объязательно для<br/> эффективности</h3>
                  <div className='offerForm__servicesBtns'>
                    <button type='button'
                      style={status === 'gold' ? { backgroundColor: '#ecff18' } : { backgroundColor: '#ecff18' }}
                      onMouseDown={(e) => console.log(e)}
                      className={status === 'gold' ? 'offerForm__btn--gold offerForm__btn offerForm__btn--active' : 'offerForm__btn--gold offerForm__btn'}
                      onClick={(ev) => onChangeGold(ev)}
                    >
                      Выделить золотым
                      <span className='offerForm__servicePrice'>25 руб.</span>
                    </button>
                    <button
                      style={status === 'silver' ? { backgroundColor: '#ddedd6' } : { backgroundColor: '#ddedd6' }}
                      className={status === 'silver' ? 'offerForm__btn--silver offerForm__btn offerForm__btn--active' : 'offerForm__btn--silver offerForm__btn'}
                      onClick={(ev) => onChangeSilver(ev)}
                    >
                      Выделить серебряным
                      <span className='offerForm__servicePrice'>25 руб.</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="offerForm__btns">
                <div className="offerForm__moreService">
                  <h3 className='offerForm__serviceTitle'>Увеличение <br /> продаж</h3>
                  <div className='offerForm__servicesBtns'>
                    <button
                      className={serviceArr.includes('shares') ? 'offerForm__btn--shares offerForm__btn offerForm__btn--active' : 'offerForm__btn--shares offerForm__btn'}
                      onClick={(ev) => onChangeService(ev, 'shares')}
                    >
                      Акции
                      <span className='offerForm__servicePrice'>25 руб.</span>
                    </button>
                    <button
                      className={serviceArr.includes('sales') ? 'offerForm__btn--shares offerForm__btn offerForm__btn--active' : 'offerForm__btn--shares offerForm__btn'}
                      onClick={(ev) => onChangeService(ev, 'sales')}
                    >
                      Скидки
                      <span className='offerForm__servicePrice'>25 руб.</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="offerForm__btns">
                <div className="offerForm__moreService">
                  <h3 className='offerForm__serviceTitle'>Больше заинтересованых соискателей</h3>
                  <div className='offerForm__servicesBtns'>
                    <button
                      className={serviceArr.includes('hots') ? 'offerForm__btn--green offerForm__btn offerForm__btn--active' : 'offerForm__btn--green offerForm__btn'}
                      style={serviceArr.includes('hots') ? { backgroundColor: '#9CDD7D' } : { backgroundColor: '#9CDD7D' }}
                      onClick={(ev) => onChangeService(ev, 'hots')}
                    >
                      Горячие
                      <span className='offerForm__servicePrice'>25 руб.</span>
                    </button>
                    <button
                      className={serviceArr.includes('recommend') ? 'offerForm__btn--green offerForm__btn offerForm__btn--active' : 'offerForm__btn--green offerForm__btn'}
                      style={serviceArr.includes('recommend') ? { backgroundColor: '#9CDD7D' } : { backgroundColor: '#9CDD7D' }}
                      onClick={(ev) => onChangeService(ev, 'recommend')}
                    >
                      Рекомендованые
                      <span className='offerForm__servicePrice'>25 руб.</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="offerForm__btns">
                <div className="offerForm__moreService">
                  <h3 className='offerForm__serviceTitle'>Привлекающие<br />внимание</h3>
                  <div className='offerForm__servicesBtns'>
                    <button 
                      className={serviceArr.includes('runStroke') ? 'offerForm__btn--pink offerForm__btn offerForm__btn--active' : 'offerForm__btn--pink offerForm__btn'}
                      style={serviceArr.includes('runStroke') ? { backgroundColor: '#FFC8C8' } : { backgroundColor: '#FFC8C8' }}
                      onClick={(ev) => onChangeService(ev, 'runStroke')}
                    >
                      Бегущая строка
                      <span className='offerForm__servicePrice'>25 руб.</span>
                    </button>
                    <button 
                      className={serviceArr.includes('banner') ? 'offerForm__btn--pink offerForm__btn offerForm__btn--active' : 'offerForm__btn--pink offerForm__btn'}
                      style={serviceArr.includes('banner') ? { backgroundColor: '#FFC8C8' } : { backgroundColor: '#FFC8C8' }}
                      onClick={(ev) => onChangeService(ev, 'banner')}
                    >
                      Баннер
                      <span className='offerForm__servicePrice'>25 руб.</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
            <div className='offerForm__totalPriceContainer'>
              <div className="offerForm__days">
                <span>Количество дней:</span>
                <div className="offerForm__daysCounter">
                  <button type='button' className="offerForm__daysBtn" onClick={() => setDays(days - 1)} disabled={days === 1}>-</button>
                  <span className='offerForm__daysCount'>{days}</span>
                  <button type='button' className="offerForm__daysBtn" onClick={() => setDays(days + 1)} disabled={days === 10}>+</button>
                </div>
              </div>
              <p className='offerForm__totalPrice'>Общая сумма: {price}руб.</p>
            </div>

            <button type='button' className='offerForm__btnSubmit' onClick={(ev) => onSubmit(ev)}>
              ОПЛАТИТЬ И ОПУБЛИКОВАТЬ
              {isLodaing && <DimmerLoader/>}
            </button>

            {/* <Liqpay price={price} /> */}
          </form>

        </div>

      </div>
    </div >
  )
}
