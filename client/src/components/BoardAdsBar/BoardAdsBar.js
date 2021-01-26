import React, { useState,useEffect } from 'react'
import './BoardAdsBar.scss'
import Arms from '../../assets/svg/armsIcon.svg'
import SvgColor from 'react-svg-color'
import CarIcon from '../../assets/svg/car.svg'
import House from '../../assets/svg/house.svg'
import people from '../../assets/svg/people.svg'
import work from '../../assets/svg/work.svg'
import newIcon from '../../assets/svg/new.svg'
import favorites from '../../assets/svg/favorites.svg'
import DropdownCity from '../DropdownCity/DropdownCity'
import { Link,useParams } from 'react-router-dom'
import NavDropdown from "../NavDropdown/NavDropdown";
import * as categoryArr from '../../assets/json/category.json'
import {useDispatch, useSelector} from 'react-redux'
import {changeSelectedSubcategory,changeSelectedCategory } from '../../redux/actions/dropdownAction'
import {changeSelectedCategoryNav} from '../../redux/actions/categoryAction'
import { getCategory } from '../../redux/selectors/categorySelector'

export default function BoardAdsBar() {
  const category= useSelector(getCategory);
  const { nav } = useParams();
  const  dispatch = useDispatch()
  //dropdown section(category)
  const stateSection = JSON.parse(JSON.stringify(categoryArr.default))
  const optionsSection = Object.keys(stateSection).map((item, i) => {
    return { key: i, text: item, value: item }
  })
  const [ subsection, setOptionsSubsection ] = useState([])
  const [ selectedSection, setSelectedSection ] = useState('')
  useEffect(() => {
    selectedSection && setOptionsSubsection(stateSection[selectedSection].map((item, i) => {
      return { key: i, text: item, value: item }
    }))
    console.log(selectedSection)
  }, [selectedSection])
  // end logic dropdown section

  const [selectedSubsection, setSelectedSubsection ] = useState('')


  useEffect(() => {
    if(nav === 'saleBuy') dispatch(changeSelectedCategoryNav('Продам/куплю'))
    if(nav === 'property') dispatch(changeSelectedCategoryNav('Недвижимость'))
    if(nav === 'auto') dispatch(changeSelectedCategoryNav('Авто'))
    if(nav === 'services') dispatch(changeSelectedCategoryNav('Услуги'))
    if(nav === 'work') dispatch(changeSelectedCategoryNav('Работа'))
    if(nav === 'newAuto') dispatch(changeSelectedCategoryNav('Новые авто'))
    if(nav === 'newHouse') dispatch(changeSelectedCategoryNav('Новые квартиры'))
    if(nav === 'favorites') dispatch(changeSelectedCategoryNav('favorites'))
    
  }, [nav])


  return (
    <ul className='boardAdsBar boardAdsBar--mt'>
      <li className={category === 'Продам/куплю' ? 'boardAdsBar__item boardAdsBar__item--active boardAdsBar__item--saleBuy' : 'boardAdsBar__item boardAdsBar__item--saleBuy'}>
        <Link to='/home/saleBuy' style={{ color: '#000' }}>
          <div className="boardAdsBar__categoryContainer">
            <SvgColor svg={Arms} colors={category === 'Продам/куплю' ? ['#fff'] : ['#616C7A']} />
            <span className='boardAdsBar__text' style={category === 'Продам/куплю' ? {color: '#fff'} : null}>Продам/Куплю</span>
          </div>
        </Link>
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--titleMargin" >Заголовок</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--cityMargin">
            <DropdownCity />
          </li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--categoryMargin">
            <NavDropdown className='offerForm__dropdown' arr={optionsSection} placeholder='Категория' onChange={setSelectedSection} action={changeSelectedCategory}/>
          </li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--subcategoryMargin">
            <NavDropdown placeholder='Подкатегория' arr={selectedSection && subsection} onChange={setSelectedSubsection} action={changeSelectedSubcategory}/>
          </li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">Цена</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
      <li className={category === 'Недвижимость' ? 'boardAdsBar__item boardAdsBar__item--property boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--property'} >
        <Link to='/home/property' style={{ color: '#000' }}>
          <div className="boardAdsBar__categoryContainer">
            <SvgColor svg={House} colors={category === 'Недвижимость' ? ['#fff'] : ['#616C7A']} />
            <span className='boardAdsBar__text' style={category === 'Недвижимость' ? {color: '#fff'} : null}>Недвижимость</span>
          </div>
        </Link>
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--titleProperty">Заголовок</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--cityMargin">
            <DropdownCity />
          </li>
    
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--categoryProperty">Категория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--subcategoryProperty">Подкатегория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--squareProperty">Площадь</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--floarMargin">Этаж</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--roomsMargin">Комнат</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--roomsMargin">Тип предложения</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">Цена</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
      <li className={category === 'Авто' ? 'boardAdsBar__item boardAdsBar__item--auto boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--auto'}>
        <Link to='/home/auto' style={{ color: '#000' }}>
          <div className="boardAdsBar__categoryContainer">
            <SvgColor svg={CarIcon} colors={category === 'Авто' ? ['#fff'] : ['#616C7A']} />
            <span className='boardAdsBar__text'style={category === 'Авто' ? {color: '#fff'} : null}> Авто</span>
          </div>
        </Link>
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--titleProperty">Заголовок</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--cityMargin"><DropdownCity /></li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--autoCategory">Категория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--brand">Марка</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--model">Модель</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--yearOfIssue">Об.дв.</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--yearOfIssue">Год</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--yearOfIssue">Цвет</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--yearOfIssue">Мощ.дв.</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">Цена</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
          
        </ul>
      </li>
      <li className={category === 'Услуги' ? 'boardAdsBar__item boardAdsBar__item--services boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--services'} >
        <Link to='/home/services' style={{ color: '#000' }}>
          <div className="boardAdsBar__categoryContainer">
            <SvgColor svg={people} colors={category === 'Услуги' ? ['#fff'] : ['#616C7A']} />
            <span className='boardAdsBar__text' style={category === 'Услуги' ? {color: '#fff'} : null}>Услуги</span>
          </div>
        </Link>
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--titleProperty">Заголовок</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--cityServices">
            <DropdownCity />
          </li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--categoryMargin">Категория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--subcategoryServices">Подкатегория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">Цена</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
      <li className={category === 'Работа' ? 'boardAdsBar__item boardAdsBar__item--work boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--work'}>
        <Link to='/home/work' style={{ color: '#000' }}>
          <div className="boardAdsBar__categoryContainer">
            <SvgColor svg={work} colors={category === 'Работа' ? ['#fff'] : ['#616C7A']} alt="Куплю,продам" />
            <span className='boardAdsBar__text' style={category === 'Работа' ? {color: '#fff'} : null}>Работа</span>
          </div>
        </Link>
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--titleMargin">Заголовок</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--cityMargin">
            <DropdownCity />
          </li>
        
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--categoryMargin">Тип работы</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--subcategoryMargin">Тип занятости</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">ЗП</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
      <li className={category === 'Новые авто' ? 'boardAdsBar__item boardAdsBar__item--newAuto boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--newAuto'}>
        <Link to='/home/newAuto' style={{ color: '#000' }}>
          <div className="boardAdsBar__categoryContainer">
            <SvgColor svg={newIcon} colors={category === 'Новые авто' ? ['#fff'] : ['#616C7A']} />
            <span className='boardAdsBar__text' style={category === 'Новые авто' ? {color: '#fff'} : null}>Новые авто</span>
          </div>
        </Link>
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--titleMargin">Заголовок</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--cityMargin"><DropdownCity /></li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--autoCategory">Категория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--yearOfIssue">Год выпуска</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--brand">Марка</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--model">Модель</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">Цена</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
      <li className={category === 'Новые квартиры' ? 'boardAdsBar__item boardAdsBar__item--newHouse boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--newHouse'}>
        <Link to='/home/newHouse' active style={{ color: '#000' }}>
          <div className="boardAdsBar__categoryContainer">
            <SvgColor svg={newIcon} colors={category === 'Новые квартиры' ? ['#fff'] : ['#616C7A']} />
            <span className='boardAdsBar__text' style={category === 'Новые квартиры' ? {color: '#fff'} : null}>Новые квартиры</span>
          </div>
        </Link>
        <ul className="boardAdsBar__subMenu">
        <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--titleProperty">Заголовок</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--cityMargin">
            <DropdownCity />
          </li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--categoryProperty">Категория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--subcategoryProperty">Подкатегория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--squareProperty">Площадь</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--floarMargin">Этаж</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--roomsMargin">Комнат</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--roomsMargin">Тип предложения</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">Цена</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
      <li className={category === 'favorites' ? 'boardAdsBar__item boardAdsBar__item--favorites boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--favorites'} >
        <Link to='/home/favorites' active style={{ color: '#000' }}>
          <div className="boardAdsBar__categoryContainer">
            <img src={category === 'favorites' ? favorites : favorites} alt="Куплю,продам" />
            <span className='boardAdsBar__text' style={category === 'favorites' ? {color: '#fff'} : null}>Избранное</span>
          </div>
        </Link>
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--titleMargin">Заголовок</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--cityMargin">
            <DropdownCity />
          </li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--categoryMargin">Категория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--subcategoryMargin">Подкатегория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">Цена</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
    </ul>
  )
}
