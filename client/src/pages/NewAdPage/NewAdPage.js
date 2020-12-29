import React, { useCallback, useEffect, useState,useMemo } from 'react'
import axios from 'axios'
import './NewAdPage.scss'
import { Input, Dropdown,Form,TextArea,Button } from 'semantic-ui-react'
import * as category from '../../assets/json/category.json'
import * as cityData from '../../assets/json/russian-cities.json'
import { useHistory } from 'react-router-dom'
import config from '../../config/default.json'
import { useAuth } from '../../hooks/useAuth'
import _ from 'lodash'
export default function NewAdPage() {
  //раздел
  const [section, setSection] = useState('')
  const [ stateSection, setStateSection ] = useState(() => JSON.parse(JSON.stringify(category.default)))
  const [ cityDataArr, setCityDataArr ] = useState(() => JSON.parse(JSON.stringify(cityData.default)))
  const [ uniqueSubject, setUniqueSubject ] = useState(() => {
    const popularCity = [];
    cityDataArr.map(item => {
      if(item.population >= 500000){
        popularCity.push(item)
      }
    })
    const dataUnique = new Map();
    popularCity.map((item) => dataUnique.set(item.subject,item.subject));
    const uniqueArr = [];
     dataUnique.forEach((item,i) => { 
      uniqueArr.push({ key: i, text: item, value: item }) 
    })
    return uniqueArr
  })
  const [ selectedRegion, setSelectedRegion ] = useState('')
  const [ subsection, setSubsection ] = useState([])
  const [ cityArr, setCityArr ] = useState([])
  const [ selectedSubsection, setSelectedSubsection ] = useState('')
  const [ type, setType ] = useState('')
  const [ city, setCity ] = useState('')
  const [ productPrice, setProductPrice ] = useState('')
  const [ price, setPrice ] = useState(0)
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ name, setName ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ mail, setMail ] = useState('')
  const [ status, setStatus ] = useState('common')
  const [ result, setResult ] = useState({})
  const [ serviceArr, setServiceArr ] = useState([])
  const [ images, setImages ] = useState([])
  const [ imgId,setImgId ] = useState([])
  const { userId } = useAuth();
  const [ ads,setAds ] = useState([])
  const history = useHistory();

  const typeAdConfig = [
    { key: 1, text: 'Покупка', value: 'Покупка' },
    { key: 2, text: 'Продажа', value: 'Продажа' },
    { key: 3, text: 'Аренда', value: 'Аренда' }
  ]

  const optionsSection = Object.keys(stateSection).map((item, i) => {
    return { key: i, text: item, value: item }
  })

  
  // Область
  useEffect(() => {
    section && setSubsection(stateSection[section].map((item, i) => {
      return { key: i, text: item, value: item }
    }))
  }, [section])

  //Город
  useEffect(() => {
    const filteredCity = cityDataArr.filter(item => item.subject === selectedRegion && item.population > 500000)
    const optionsCity = filteredCity.map((item, i) => {
      return { key: i, text: item.name, value: item.name }
    })
    setCityArr(optionsCity)
  }, [selectedRegion])

  // подготовка данных формы для отправки
  useEffect(() => {
    setResult({
      img: imgId.map(img => img._id),
      section: section,
      subsection: selectedSubsection,
      type: type,
      region: selectedRegion,
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
  }, [section,selectedSubsection,type,selectedRegion,city,price,title,description,name,phone,mail,status,serviceArr,productPrice,imgId])

  const uploadImage = async () => {
    const imgArr = [...images]
    const formData = new FormData()

    imgArr.map(img => {
      formData.append('image', img)
    })

    const result = await Promise.resolve(axios.post(`${config.serverUrl}/api/images`,formData))
    setImgId(result.data)
  }

  const onChangeGold = () => {

    if(status !== 'gold') {
      setPrice(() => {
        if(status === 'silver'){
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

  const onChangeSilver = () => {
    if(status !== 'silver') {
      setPrice(() => {
        if(status === 'gold') {
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


  const onChangeService = (service) => {
    if(serviceArr.includes(service)) {
      const newServiceArr = serviceArr.filter(item => item !== service)
      setServiceArr(newServiceArr)
      setPrice(price - 30)
    } else {
      setServiceArr([...serviceArr,service])
      setPrice(price + 30)
    }
  }

  const onSubmit = useCallback(async values => {
    const user = JSON.parse(localStorage.getItem('userData')).userId
    const userAds = await Promise.resolve(axios.get(`${config.serverUrl}/api/users/${user}`))
    
    const adId = await axios.post(`${config.serverUrl}/api/ads`, values)
    .then(res => res.data._id)

    const adsArr = [...userAds.data.ads,adId]
    const saveInUser = await axios.put(`${config.serverUrl}/api/users/newAd/${user}`, adsArr).then(res => history.push('/home'))

  }, [])

  return (
    <div className='container'>
      <Form className="ad" method="post" enctype="multipart/form-data">
        <div className="ad__content">
          <div className="ad__info">
            <h2 className='ad__title'>Добавить новое объявление</h2>
            <Dropdown clearable className='ad__input' options={optionsSection} selection placeholder='Раздел' onChange={(e) => setSection(e.target.innerText)} />
            <Dropdown clearable className='ad__input' placeholder='Подраздел' search selection options={subsection} onChange={(e) => setSelectedSubsection(e.target.innerText)}/>
            <Dropdown clearable className='ad__input' placeholder='Тип' search selection  options={typeAdConfig} onChange={(e) => setType(e.target.innerText)}/>
            <Dropdown clearable className='ad__input' placeholder='Область' search selection options={uniqueSubject} onChange={(e) => setSelectedRegion(e.target.innerText)}/>
            <Dropdown clearable className='ad__input' placeholder='Город' search selection options={cityArr} onChange={(e) => setCity(e.target.innerText)}/>
            <Input className='ad__input' placeholder='Цена $' onChange={(e) => setProductPrice(e.target.value)}/>
          </div>
          <div className="ad__img">
            <h2 className='ad__title'>Фото</h2>
            <input type="file" onChange={(e) => setImages(e.target.files)} multiple/>
            {[...images].map((file, i) => (
              <div className='ad__imgContainer'>
                <img src={URL.createObjectURL(file)} width='100' height='100'></img>
              </div>
            ))}
            <Button onClick={() => uploadImage()}>Загрузить фото</Button>
          </div>
        </div>
        <div className="ad__content">
          <div className="ad__data">
            <h2 className='ad__title'>Данные объявление</h2>
            <h3>Заголовок</h3>
            <Input className='ad__input' onChange={(e) => setTitle(e.target.value)}/>
            <p>Описание:</p>
            <TextArea onChange={(e) => setDescription(e.target.value)}/>
          </div>
          <div className="ad__contacts">
            <h2 className='ad__title'>Контакты</h2>
            <div><Input className='ad__input' placeholder='Имя' onChange={(e) => setName(e.target.value)}/></div>
            <div><Input className='ad__input' placeholder='Телефон' onChange={(e) => setPhone(e.target.value)}/></div>
            <div><Input className='ad__input' placeholder='Почта' onChange={(e) => setMail(e.target.value)}/></div>
          </div>
        </div>
        <div className='ad__content'>
          <div className="ad__btns">
            <h3>Объязательно для эффективности</h3>
            <div className='ad__btnContainer'>
              <button style={status === 'gold' ? {backgroundColor:'#ece218'} : {backgroundColor:'#ecff18'}} className='ad__btn--gold ad__btn' onClick={() => onChangeGold()}>
                Выделить золотым
              </button>
            </div>
            <div className='ad__btnContainer'>
              <button style={status === 'silver' ? {backgroundColor:'#bec6c1'} : {backgroundColor:'#ddedd6'}} className='ad__btn--silver ad__btn' onClick={(e) => onChangeSilver()}>
                Выделить серебряным
              </button>
            </div>
          </div>
          <div className="ad__btns">
            <h3>Увеличение продаж</h3>
            <div className="ad__btnContainer"><button style={ serviceArr.includes('shares') ? {backgroundColor:'#78849A'} : {backgroundColor:'#B4C6E7'}} className='ad__btn--blue ad__btn' onClick={() => onChangeService('shares')}>Акции</button></div>
            <div className="ad__btnContainer"><button style={ serviceArr.includes('sales') ? {backgroundColor:'#78849A'} : {backgroundColor:'#B4C6E7'}}  className='ad__btn--blue ad__btn' onClick={() => onChangeService('sales')}>Скидки</button></div>
          </div>
          <div className="ad__btns">
            <h3>Больше заинтересованых соискателей</h3>
            <button className='ad__btn--gray ad__btn' style={ serviceArr.includes('hots') ? {backgroundColor:'#808080'} : {backgroundColor:'#D9D9D9'}} onClick={() => onChangeService('hots')}>Горячие</button>
            <button className='ad__btn--gray ad__btn' style={ serviceArr.includes('recommend') ? {backgroundColor:'#808080'} : {backgroundColor:'#D9D9D9'}} onClick={() => onChangeService('recommend')}>Рекомендованые</button>
          </div>
          <div className="ad__btns">
            <h3>Привлекающие внимание</h3>
            <button className='ad__btn--green ad__btn' style={ serviceArr.includes('runStroke') ? {backgroundColor:'#8B9D7E'} : {backgroundColor:'#C6E0B4'}} onClick={() => onChangeService('runStroke')}>Бегущая строка</button>
            <button className='ad__btn--green ad__btn' style={ serviceArr.includes('banner') ? {backgroundColor:'#8B9D7E'} : {backgroundColor:'#C6E0B4'}} onClick={() => onChangeService('banner')}>Баннер</button>
          </div>
        </div>
        <div>
          <h2>Price:{price}$</h2>
          <Button inverted color='brown' onClick={() => onSubmit(result)}>
            Подтвердить
          </Button>
        </div>
      </Form>
    </div>
  )
}
