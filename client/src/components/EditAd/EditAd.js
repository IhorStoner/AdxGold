import React, { useState, useEffect, useCallback } from 'react'
import category from '../../assets/json/category.json'
import property from '../../assets/json/property.json'
import work from '../../assets/json/work.json'
import services from '../../assets/json/services.json'
import auto from '../../assets/json/auto.json'
import cityDataArr from '../../assets/json/russian-cities.json'
import config from '../../config/default.json'
import axios from 'axios'
import MyDropdown from '../MyDropdown/MyDropdown'
import { useDispatch, useSelector } from 'react-redux'
import iconEdit from '../../assets/svg/iconEdit.svg'
import { fetchSharesAds } from '../../redux/actions/adsAction'
import DimmerLoader from '../../components/DimmerLoader/DimmerLoader'
import { useHistory } from 'react-router-dom'
import './EditAd.scss'


export default function EditAd({ ad, setEditAdId }) {

  const [selectedSection, setSelectedSection] = useState(ad.category) //выбраный раздел куплю/продам...
  const [selectedCategory, setSelectedCategory] = useState(ad.section) // выбранная категория 
  const [selectedSubcategory, setSelectedSubcategory] = useState(ad.subsection)

  const [optionsCategory, setOptionsCategory] = useState([]) // опции выбора категории
  const [optionsSubcategory, setOptionsSubcategory] = useState([]) // опции выбора подкатегорий
  const [optionsMark, setOptionsMark] = useState([]) //опции выбора Авто
  const [optionsCity, setOptionsCity] = useState([])// 

  const [city, setCity] = useState(ad.city)
  const [productPrice, setProductPrice] = useState(ad.productPrice)
  const [price, setPrice] = useState(Number(ad.priceAd))
  const [title, setTitle] = useState(ad.title)
  const [description, setDescription] = useState(ad.description)
  const [name, setName] = useState(ad.name)
  const [phone, setPhone] = useState(ad.phone)
  const [mail, setMail] = useState(ad.mail)
  const [status, setStatus] = useState(ad.status)
  const [result, setResult] = useState({})
  const [serviceArr, setServiceArr] = useState(ad.services)
  const [images, setImages] = useState([])
  const [imgNames, setImgNames] = useState(ad.img)
  const [days, setDays] = useState(Number(ad.days))
  const [fields, setFields] = useState(ad.fields ? ad.fields : {})
  const [isLodaing, setIsLoading] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch()

  const categoryArr = [
    { key: 1, text: 'Продам/куплю', value: 'Продам/куплю' },
    { key: 2, text: 'Недвижимость', value: 'Недвижимость' },
    { key: 3, text: 'Авто', value: 'Авто' },
    { key: 4, text: 'Услуги', value: 'Услуги' },
    { key: 5, text: 'Работа', value: 'Работа' },
    { key: 6, text: 'Новые авто', value: 'Новые авто' },
    { key: 7, text: 'Новые квартиры', value: 'Новые квартиры' },
  ]
  const optionsPropertyType = [
    { key: 1, text: 'От застройщика', value: 'От застройщика' },
    { key: 2, text: 'От собственника', value: 'От собственника' },
    { key: 3, text: 'От посредника', value: 'От посредника' },
  ]

  //в зависимости от раздела выбираем объект категорий
  useEffect(() => {
    if (!selectedSection) setOptionsCategory([])
    if (selectedSection === 'Продам/куплю') setOptionsCategory(Object.keys(category).map((item, i) => {
      return { key: i, text: item, value: item }
    }))
    if (selectedSection === 'Недвижимость' || selectedSection === 'Новые квартиры') setOptionsCategory(Object.keys(property).map((item, i) => {
      return { key: i, text: item, value: item }
    }))
    if (selectedSection === 'Авто' || selectedSection === 'Новые авто') setOptionsCategory(Object.keys(auto).map((item, i) => {
      return { key: i, text: item, value: item }
    }))
    if (selectedSection === 'Услуги') setOptionsCategory(Object.keys(services).map((item, i) => {
      return { key: i, text: item, value: item }
    }))
    if (selectedSection === 'Работа') setOptionsCategory(Object.keys(work).map((item, i) => {
      return { key: i, text: item, value: item }
    }))
  }, [selectedSection, selectedCategory])

  // опции выбора подкатегории
  useEffect(() => {
    if (!selectedSection) setOptionsSubcategory([])
    if (selectedSection === 'Продам/куплю') selectedCategory && setOptionsSubcategory(category[selectedCategory].map((item, i) => {
      return { key: i, text: item, value: item }
    }))
    if (selectedSection === 'Недвижимость' || selectedSection === 'Новые квартиры') selectedCategory && setOptionsSubcategory(property[selectedCategory].map((item, i) => {
      return { key: i, text: item, value: item }
    }))
    if (selectedSection === 'Авто' || selectedSection === 'Новые авто') selectedCategory && setOptionsSubcategory(Object.keys(auto[selectedCategory]).map((item, i) => {
      return { key: i, text: item, value: item }
    }))
    if (selectedSection === 'Услуги') setOptionsSubcategory(Object.keys(services[selectedCategory]).map((item, i) => {
      return { key: i, text: item, value: item }
    }))
    if (selectedSection === 'Работа') setOptionsSubcategory(work[selectedCategory].map((item, i) => {
      return { key: i, text: item, value: item }
    }))
  }, [selectedCategory])

  //марка Авто или запчасти
  useEffect(() => {
    if (selectedSection === 'Авто' || selectedSection === 'Новые авто') {
      selectedSubcategory && setOptionsMark(auto[selectedCategory][selectedSubcategory].map((item, i) => {
        return { key: i, text: item, value: item }
      }))
    } else {
      setOptionsMark([])
    }

  }, [selectedSubcategory])

  //Город
  useEffect(() => {
    const filteredCity = cityDataArr.filter(item => item.population > 500000)
    const optionsCity = filteredCity.map((item, i) => {
      return { key: i, text: item.name, value: item.name }
    })
    setOptionsCity(optionsCity)
  }, [])

  // подготовка данных формы для отправки
  useEffect(() => {
    setResult({
      section: selectedCategory,
      subsection: selectedSubcategory,
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
      category: selectedSection,
      fields: fields,
    })
  }, [selectedCategory, selectedSubcategory, city, price, title, description, name, phone, mail, status, serviceArr, productPrice, imgNames, images, selectedSection, fields])

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
    const formData = new FormData();
    [...images].map(img => formData.append('slider', img))

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
      )

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

  const onChangePriceByDay = (action) => {
    if (action === 'minus') {
      setDays(days - 1)
      setPrice(price - 25)
    } else if (action === 'plus') {
      setDays(days + 1)
      setPrice(price + 25)
    }

  }

  const onSubmit = useCallback(async (ev) => {
    setIsLoading(true)
    ev.preventDefault()
    const resultImg = await submitAxios(ev);
    let finnalyData = result;
    finnalyData.img = resultImg

    const adId = await axios.put(`${config.serverUrl}/api/offer/${ad._id}`, finnalyData)
      .then(res => history.push('/home'))

  }, [result])

  //нажатие на крестик категории
  const handleResetSection = () => {
    setSelectedSection('')
    setSelectedCategory('')
    setSelectedSubcategory('')
    setOptionsCategory([])
    setOptionsSubcategory([])
    setOptionsMark([])
    setFields({})
  }
  const handleResetCategory = () => {
    setSelectedCategory('')
    setSelectedSubcategory('')
    setOptionsSubcategory([])
    setOptionsMark([])
    setFields({})
  }
  const handleResetSubCategory = () => {
    setSelectedSubcategory('')
    setOptionsMark([])
    setFields({})
  }
  //deleteImage
  const handleDeleteImage = (file) => {
    setImages([...images].filter(img => img.name !== file.name))
  }


  return (
    <form className="offerForm editForm" method="post" enctype="multipart/form-data" id='exampleForm'>
      <h2 className='editForm__title'>
        Редактирование объявления <img className='editForm__titleImg' src={iconEdit} alt=""/>
      </h2>
      <div className="offerForm__content">
        <div className="offerForm__info offerForm__item">
          <h2 className='offerForm__title'>Данные объявления</h2>
          <div className="offerForm__itemContent offerForm__itemInfo">
            <div className="offerForm__itemColumn">
              <MyDropdown className='offerForm__dropdown' handleBtnReset={handleResetSection} value={ad.category} arr={categoryArr} placeholder='Раздел' onChange={(e) => setSelectedSection(e.target.innerText)} />

              {selectedSection &&
                <MyDropdown className='offerForm__dropdown' handleBtnReset={handleResetCategory} value={ad.section} arr={selectedSection && optionsCategory} placeholder='Категория' onChange={(e) => selectedSection ? setSelectedCategory(e.target.innerText) : setSelectedCategory('')} />
              }

              {selectedSection && selectedCategory &&
                <MyDropdown handleBtnReset={handleResetSubCategory} value={ad.subsection} placeholder={selectedSection === 'Авто'  && selectedCategory === 'Легковые' || selectedCategory === 'Мото' ? 'Марка' : 'Подкатегория'} arr={selectedCategory && optionsSubcategory} onChange={(e) => setSelectedSubcategory(e.target.innerText)} />
              }

              {selectedSection === 'Авто' && selectedSubcategory &&
                <MyDropdown placeholder={selectedSubcategory === 'Запчасти' ? 'Принадлежность' : 'Модель'} value={ad.mark} arr={selectedSubcategory ? optionsMark : []} onChange={(e) => setFields({ ...fields, mark: e.target.innerText })} />
              }
              {
                selectedSection === 'Новые авто' && selectedSubcategory &&
                <MyDropdown placeholder={selectedSubcategory === 'Запчасти' ? 'Принадлежность' : 'Модель'} value={ad.mark} arr={selectedSubcategory ? optionsMark : []} onChange={(e) => setFields({ ...fields, mark: e.target.innerText })} />
              }

              <MyDropdown placeholder='Город' value={ad.city} arr={optionsCity} onChange={(e) => setCity(e.target.innerText)} />
              {
                selectedSection === 'Недвижимость' &&
                <div>
                  <MyDropdown placeholder='Тип предложения' arr={optionsPropertyType} onChange={(e) => setFields({ ...fields, type: e.target.innerText })} />
                  <p className='offerForm__inputContainer'>Этаж<span className='offerForm__star'>*</span><input className='offerForm__itemInput' type="text" value={fields.floor} onChange={(e) => setFields({ ...fields, floor: e.target.value })} /></p>
                  <p className='offerForm__inputContainer'>Комнат<span className='offerForm__star'>*</span> <input className='offerForm__itemInput' type="text" value={fields.rooms} onChange={(e) => setFields({ ...fields, rooms: e.target.value })} /></p>
                  <p className='offerForm__inputContainer'>Площадь<span className='offerForm__star'>*</span> <input className='offerForm__itemInput' type="text" value={fields.square} onChange={(e) => setFields({ ...fields, square: e.target.value })} /></p>
                </div>
              }
              {
                selectedSection === 'Новые квартиры' &&
                <div>
                  <MyDropdown placeholder='Тип предложения' arr={optionsPropertyType} onChange={(e) => setFields({ ...fields, type: e.target.innerText })} />
                  <p className='offerForm__inputContainer'>Этаж<span className='offerForm__star'>*</span><input className='offerForm__itemInput' type="text" value={fields.floor} onChange={(e) => setFields({ ...fields, floor: e.target.value })} /></p>
                  <p className='offerForm__inputContainer'>Комнат<span className='offerForm__star'>*</span> <input className='offerForm__itemInput' type="text" value={fields.rooms} onChange={(e) => setFields({ ...fields, rooms: e.target.value })} /></p>
                  <p className='offerForm__inputContainer'>Площадь<span className='offerForm__star'>*</span> <input className='offerForm__itemInput' type="text" value={fields.square} onChange={(e) => setFields({ ...fields, square: e.target.value })} /></p>
                </div>
              }
              {
                selectedSection === 'Авто' && selectedCategory && selectedCategory !== 'Запчасти' &&
                <div>
                  <p className='offerForm__inputContainer'>Объем двигателя<span className='offerForm__star'>*</span><input className='offerForm__itemInput' type="text" value={fields.engine} onChange={(e) => setFields({ ...fields, engine: e.target.value })} /></p>
                  <p className='offerForm__inputContainer'>Год выпуска<span className='offerForm__star'>*</span> <input className='offerForm__itemInput' type="text" value={fields.year} onChange={(e) => setFields({ ...fields, year: e.target.value })} /></p>
                  <p className='offerForm__inputContainer'>Цвет<span className='offerForm__star'>*</span> <input className='offerForm__itemInput' type="text" value={fields.color} onChange={(e) => setFields({ ...fields, color: e.target.value })} /></p>
                </div>
              }
              {
                selectedSection === 'Новые авто' && selectedCategory && selectedCategory !== 'Запчасти' &&
                <div>
                  <p className='offerForm__inputContainer'>Объем двигателя<span className='offerForm__star'>*</span><input className='offerForm__itemInput' type="text" value={fields.engine} onChange={(e) => setFields({ ...fields, engine: e.target.value })} /></p>
                  <p className='offerForm__inputContainer'>Год выпуска<span className='offerForm__star'>*</span> <input className='offerForm__itemInput' type="text" value={fields.year} onChange={(e) => setFields({ ...fields, year: e.target.value })} /></p>
                  <p className='offerForm__inputContainer'>Цвет<span className='offerForm__star'>*</span> <input className='offerForm__itemInput' type="text" value={fields.color}  onChange={(e) => setFields({ ...fields, color: e.target.value })} /></p>
                </div>
              }
            </div>
            {
              selectedSection === 'Недвижимость' &&
              <div className="offerForm__itemColumn">
                <p className='offerForm__inputContainer'>Инфраструктура <input className='offerForm__itemInput' type="text" value={fields.infrastructure} onChange={(e) => setFields({ ...fields, infrastructure: e.target.value })} /></p>
                <p className='offerForm__inputContainer'>Остановки рядом <input className='offerForm__itemInput' type="text" value={fields.stopping} onChange={(e) => setFields({ ...fields, stopping: e.target.value })} /></p>
                <p className='offerForm__inputContainer'>Станция <input className='offerForm__itemInput' type="text" value={fields.station} onChange={(e) => setFields({ ...fields, station: e.target.value })} /></p>
                <p className='offerForm__inputContainer'>Метро <input className='offerForm__itemInput' type="text" value={fields.metro} onChange={(e) => setFields({ ...fields, metro: e.target.value })} /></p>
                <p className='offerForm__inputContainer'>Наличие балкона<input className='offerForm__itemInput' type="text" value={fields.balcony} onChange={(e) => setFields({ ...fields, balcony: e.target.value })} /></p>
                <p className='offerForm__inputContainer'>Тип стен <input className='offerForm__itemInput' type="text" value={fields.walls} onChange={(e) => setFields({ ...fields, walls: e.target.value })} /></p>
              </div>
            }
            {
              selectedSection === 'Новые квартиры' &&
              <div className="offerForm__itemColumn">
                <p className='offerForm__inputContainer'>Инфраструктура <input className='offerForm__itemInput' type="text" value={fields.infrastructure} onChange={(e) => setFields({ ...fields, infrastructure: e.target.value })} /></p>
                <p className='offerForm__inputContainer'>Остановки рядом <input className='offerForm__itemInput' type="text" value={fields.stopping} onChange={(e) => setFields({ ...fields, stopping: e.target.value })} /></p>
                <p className='offerForm__inputContainer'>Станция <input className='offerForm__itemInput' type="text" value={fields.station} onChange={(e) => setFields({ ...fields, station: e.target.value })} /></p>
                <p className='offerForm__inputContainer'>Метро <input className='offerForm__itemInput' type="text" value={fields.metro} onChange={(e) => setFields({ ...fields, metro: e.target.value })} /></p>
                <p className='offerForm__inputContainer'>Наличие балкона<input className='offerForm__itemInput' type="text" value={fields.balcony} onChange={(e) => setFields({ ...fields, balcony: e.target.value })} /></p>
                <p className='offerForm__inputContainer'>Тип стен <input className='offerForm__itemInput' type="text" value={fields.walls} onChange={(e) => setFields({ ...fields, walls: e.target.value })} /></p>
              </div>
            }
            {
              selectedSection === 'Авто' && selectedCategory && selectedCategory !== 'Запчасти' &&
              <div className="offerForm__itemColumn">
                <p className='offerForm__inputContainer'>Пробег<input className='offerForm__itemInput' type="text" value={fields.milage} onChange={(e) => setFields({ ...fields, milage: e.target.value })} /></p>
                <p className='offerForm__inputContainer'>Мощность двигателя<input className='offerForm__itemInput' type="text" value={fields.enginePower} onChange={(e) => setFields({ ...fields, enginePower: e.target.value })} /></p>
                {selectedCategory !== 'Мото' && <p className='offerForm__inputContainer'>Кол-во дверей<input className='offerForm__itemInput' type="text" value={fields.countDoors} onChange={(e) => setFields({ ...fields, countDoors: e.target.value })} /></p>}
                <p className='offerForm__inputContainer'>Коробка передач<input className='offerForm__itemInput' type="text" value={fields.transmission} onChange={(e) => setFields({ ...fields, transmission: e.target.value })} /></p>
                <p className='offerForm__inputContainer'>Состояние<input className='offerForm__itemInput' type="text" value={fields.carState} onChange={(e) => setFields({ ...fields, carState: e.target.value })} /></p>
              </div>
            }
            {
              selectedSection === 'Новые авто' && selectedCategory && selectedCategory !== 'Запчасти' &&
              <div className="offerForm__itemColumn">
                <p className='offerForm__inputContainer'>Пробег<input className='offerForm__itemInput' type="text" value={fields.milage} onChange={(e) => setFields({ ...fields, milage: e.target.value })} /></p>
                <p className='offerForm__inputContainer'>Мощность двигателя<input className='offerForm__itemInput' type="text" value={fields.enginePower} onChange={(e) => setFields({ ...fields, enginePower: e.target.value })} /></p>
                {selectedCategory !== 'Мото' && <p className='offerForm__inputContainer'>Кол-во дверей<input className='offerForm__itemInput'  type="text" value={fields.countDoors} onChange={(e) => setFields({ ...fields, countDoors: e.target.value })} /></p>}
                <p className='offerForm__inputContainer'>Коробка передач<input className='offerForm__itemInput' type="text" value={fields.transmission} onChange={(e) => setFields({ ...fields, transmission: e.target.value })} /></p>
                <p className='offerForm__inputContainer'>Состояние<input className='offerForm__itemInput' type="text" value={fields.carState} onChange={(e) => setFields({ ...fields, carState: e.target.value })} /></p>
              </div>
            }
          </div>
        </div>

        <div className="offerForm__img offerForm__item">
          <h2 className='offerForm__title'>Фотографии</h2>
          <div className="offerForm__itemContent offerForm__images">
            <label className='offerForm__labelFile offerForm__imgItem' for="uploadImg">Добавить<br />Фото</label>
            <input type="file" name="slider" onChange={(e) => setImages(e.target.files)} class="offerForm__inputFile" id="uploadImg" accept="image/jpeg,image/png,image/jpg" multiple />
            {images && [...images].map((file, i) => (
              <div className="offerForm__imgContainer">
                <button type='button' className="offerForm__btnDelImg" onClick={() => handleDeleteImage(file)} />
                <img src={URL.createObjectURL(file)} className='offerForm__imgItem' width='150' height='150'></img>
              </div>
            ))}
            {imgNames && images.length === 0 && imgNames.map(imgName => (
              <img src={`${config.serverUrl}/api/images/${imgName}`} className='offerForm__imgItem' width='150' height='150'></img>
            ))}
          </div>
        </div>
      </div>
      <div className="offerForm__content">
        <div className="offerForm__data offerForm__item">
          <h2 className='offerForm__title'>Описание объявления</h2>
          <div className="offerForm__itemContent">
            <h3 className='offerForm__text'>Заголовок</h3>
            <input type="text" className='offerForm__input' value={title} onChange={(e) => setTitle(e.target.value)} />
            <p className='offerForm__text'>Описание</p>
            <textarea className='offerForm__descriptionInput' value={description} onChange={(e) => setDescription(e.target.value)} />
            <div className='offerForm__priceContainer'>
              <p className='offerForm__priceText'>Цена:</p>
              <input type="text" className='offerForm__input offerForm__input--priceInput' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="offerForm__contacts offerForm__item">
          <h2 className='offerForm__title '>Контактные данные</h2>
          <div className="offerForm__itemContent offerForm__contactsContent">
            <div className='offerForm__contactsContainer'>
              <p className='offerForm__text'>Имя</p>
              <input type="text" className='offerForm__input offerForm__contactInput' value={name} placeholder='Добавить имя' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='offerForm__contactsContainer'>
              <p className='offerForm__text'>Телефон</p>
              <input type="text" className='offerForm__input offerForm__contactInput' value={phone} placeholder='Укажите телефон' onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className='offerForm__contactsContainer'>
              <p className='offerForm__text'>Эл.почта</p>
              <input type="text" className='offerForm__input offerForm__contactInput' value={mail} placeholder='Укажите почту' onChange={(e) => setMail(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className='offerForm__content'>

        <div className="offerForm__btns">
          <div className="offerForm__moreService">
            <h3 className='offerForm__serviceTitle'>Объязательно для<br /> эффективности</h3>
            <div className='offerForm__servicesBtns'>
              <button type='button'
                style={status === 'gold' ? { backgroundColor: '#ecff18' } : { backgroundColor: '#ecff18' }}
                className={status === 'gold' ? 'offerForm__btn--gold offerForm__btn offerForm__btn--active' : 'offerForm__btn--gold offerForm__btn'}
                onClick={(ev) => onChangeGold(ev)}
              >
                Выделить золотым
                      <span className='offerForm__servicePrice'>50 руб.</span>
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
                      <span className='offerForm__servicePrice'>30 руб.</span>
              </button>
              <button
                className={serviceArr.includes('sales') ? 'offerForm__btn--shares offerForm__btn offerForm__btn--active' : 'offerForm__btn--shares offerForm__btn'}
                onClick={(ev) => onChangeService(ev, 'sales')}
              >
                Скидки
                      <span className='offerForm__servicePrice'>30 руб.</span>
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
                <span className='offerForm__servicePrice'>30 руб.</span>
              </button>
              <button
                className={serviceArr.includes('recommend') ? 'offerForm__btn--green offerForm__btn offerForm__btn--active' : 'offerForm__btn--green offerForm__btn'}
                style={serviceArr.includes('recommend') ? { backgroundColor: '#9CDD7D' } : { backgroundColor: '#9CDD7D' }}
                onClick={(ev) => onChangeService(ev, 'recommend')}
              >
                Рекомендованые
                <span className='offerForm__servicePrice'>30 руб.</span>
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
                      <span className='offerForm__servicePrice'>30 руб.</span>
              </button>
              <button
                className={serviceArr.includes('banner') ? 'offerForm__btn--pink offerForm__btn offerForm__btn--active' : 'offerForm__btn--pink offerForm__btn'}
                style={serviceArr.includes('banner') ? { backgroundColor: '#FFC8C8' } : { backgroundColor: '#FFC8C8' }}
                onClick={(ev) => onChangeService(ev, 'banner')}
              >
                Баннер
                <span className='offerForm__servicePrice'>30 руб.</span>
              </button>
            </div>
          </div>
        </div>

      </div>
      <div className='offerForm__totalPriceContainer'>
        <div className="offerForm__days">
          <span>Количество дней:</span>
          <div className="offerForm__daysCounter">
            <button type='button' className="offerForm__daysBtn" onClick={() => onChangePriceByDay('minus')} disabled={days === 1}>-</button>
            <span className='offerForm__daysCount'>{days}</span>
            <button type='button' className="offerForm__daysBtn" onClick={() => onChangePriceByDay('plus')} disabled={days === 10}>+</button>
          </div>
        </div>
        <p className='offerForm__totalPrice'>Общая сумма: {price}руб.</p>
      </div>
      <button type='button' className='offerForm__btnSubmit offerForm__btnSubmit--mb' onClick={(ev) => setEditAdId('')}>
        Отменить
      </button>
      
      <button type='button' className='offerForm__btnSubmit' onClick={(ev) => onSubmit(ev)}>
        ОПЛАТИТЬ И ОПУБЛИКОВАТЬ
        {isLodaing && <DimmerLoader />}
      </button>

      {/* <Liqpay price={price} /> */}
    </form>
  )
}
