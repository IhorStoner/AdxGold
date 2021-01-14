import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import './NewAdPage.scss'
import { Input, Dropdown, Form, TextArea, Button } from 'semantic-ui-react'
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
      img: imgNames,
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
    console.log(result)
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
      ).then(res => setImgNames(res.data))

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

  const setImagesData = async (e) => {
    const files = e.target.files;
    setImages(files);
    // await submitAxios(e);

  }

  const onSubmit = useCallback(async (ev, result) => {
    ev.preventDefault()
    const resultImg = await submitAxios(ev).then(res => console.log(res));

    const user = JSON.parse(localStorage.getItem('userData')).userId
    const userAds = await Promise.resolve(axios.get(`${config.serverUrl}/api/users/${user}`))

    const adId = await axios.post(`${config.serverUrl}/api/offer`, result)
      .then(res => res.data._id)

    const adsArr = [...userAds.data.ads, adId]
    const saveInUser = await axios.put(`${config.serverUrl}/api/users/newOffer/${user}`, adsArr).then(res => history.push('/home'))

  }, [])

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
                </div>
              </div>
              <div className="offerForm__img offerForm__item">
                <h2 className='offerForm__title'>Фото</h2>
                <div className="offerForm__itemContent offerForm__images">
                  <label className='offerForm__labelFile offerForm__imgItem' for="uploadImg">Добавить<br />Фото</label>
                  <input type="file" name="slider" onChange={(e) => setImagesData(e)} class="offerForm__inputFile" id="uploadImg" accept="image/*" multiple />
                  {[...images].map((file, i) => (
                    <img src={URL.createObjectURL(file)} className='offerForm__imgItem' width='150' height='150'></img>
                  ))}
                  {/* <Button onClick={(ev) => submitAxios(ev)}>Загрузить фото</Button> */}
                </div>
              </div>
            </div>
            <div className="offerForm__content">
              <div className="offerForm__info offerForm__item">
                <h2 className='offerForm__title'>Добавить новое объявление</h2>
                <div className="offerForm__itemContent">
                  <Dropdown clearable  search options={optionsSection} selection placeholder='Раздел' onChange={(e) => setSection(e.target.innerText)} />
                  <Dropdown clearable  placeholder='Подраздел' search selection options={subsection} onChange={(e) => setSelectedSubsection(e.target.innerText)} />
                  <Dropdown clearable  placeholder='Тип' search selection options={typeAdConfig} onChange={(e) => setType(e.target.innerText)} />
                  {/* <Dropdown clearable className='ad__input' placeholder='Область' search selection options={uniqueSubject} onChange={(e) => setSelectedRegion(e.target.innerText)}/> */}
                  <Dropdown clearable  placeholder='Город' search selection options={cityArr} onChange={(e) => setCity(e.target.innerText)} />
                  <Input  placeholder='Цена $' onChange={(e) => setProductPrice(e.target.value)} />
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
                <h3>Объязательно для эффективности</h3>
                <div className='offerForm__btnContainer'>
                  <button type='button' style={status === 'gold' ? { backgroundColor: '#ece218' } : { backgroundColor: '#ecff18' }} className='offerForm__btn--gold offerForm__btn' onClick={(ev) => onChangeGold(ev)}>
                    Выделить золотым
              </button>
                </div>
                <div className='offerForm__btnContainer'>
                  <button style={status === 'silver' ? { backgroundColor: '#bec6c1' } : { backgroundColor: '#ddedd6' }} className='offerForm__btn--silver offerForm__btn' onClick={(ev) => onChangeSilver(ev)}>
                    Выделить серебряным
              </button>
                </div>
              </div>
              <div className="offerForm__btns">
                <h3>Увеличение продаж</h3>
                <div className="offerForm__btnContainer"><button style={serviceArr.includes('shares') ? { backgroundColor: '#78849A' } : { backgroundColor: '#B4C6E7' }} className='offerForm__btn--blue offerForm__btn' onClick={(ev) => onChangeService(ev, 'shares')}>Акции</button></div>
                <div className="offerForm__btnContainer"><button style={serviceArr.includes('sales') ? { backgroundColor: '#78849A' } : { backgroundColor: '#B4C6E7' }} className='offerForm__btn--blue offerForm__btn' onClick={(ev) => onChangeService(ev, 'sales')}>Скидки</button></div>
              </div>
              <div className="offerForm__btns">
                <h3>Больше заинтересованых соискателей</h3>
                <button className='offerForm__btn--gray offerForm__btn' style={serviceArr.includes('hots') ? { backgroundColor: '#808080' } : { backgroundColor: '#D9D9D9' }} onClick={(ev) => onChangeService(ev, 'hots')}>Горячие</button>
                <button className='offerForm__btn--gray offerForm__btn' style={serviceArr.includes('recommend') ? { backgroundColor: '#808080' } : { backgroundColor: '#D9D9D9' }} onClick={(ev) => onChangeService(ev, 'recommend')}>Рекомендованые</button>
              </div>
              <div className="offerForm__btns">
                <h3>Привлекающие внимание</h3>
                <button className='offerForm__btn--green offerForm__btn' style={serviceArr.includes('runStroke') ? { backgroundColor: '#8B9D7E' } : { backgroundColor: '#C6E0B4' }} onClick={(ev) => onChangeService(ev, 'runStroke')}>Бегущая строка</button>
                <button className='offerForm__btn--green offerForm__btn' style={serviceArr.includes('banner') ? { backgroundColor: '#8B9D7E' } : { backgroundColor: '#C6E0B4' }} onClick={(ev) => onChangeService(ev, 'banner')}>Баннер</button>
              </div>
            </div>
            <div>
              <h2>Price:{price}$</h2>
              <Button inverted color='brown' onClick={(ev) => onSubmit(ev, result)}>
                Подтвердить
          </Button>
            </div>
            <Liqpay price={price} />
          </form>

        </div>

      </div>
    </div>
  )
}
