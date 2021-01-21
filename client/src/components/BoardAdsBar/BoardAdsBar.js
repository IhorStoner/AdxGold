import React, { useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../redux/selectors/categorySelector'
import { changeSelectedCategory } from '../../redux/actions/categoryAction'
import { Link } from 'react-router-dom'

export default function BoardAdsBar() {
  // const [category, setCategory] = useState('property')
  const category = useSelector(getCategory)

  const dispatch = useDispatch()

  return (
    <ul className='boardAdsBar boardAdsBar--mt'>
      <li className={category === 'Продам/куплю' ? 'boardAdsBar__item boardAdsBar__item--active boardAdsBar__item--saleBuy' : 'boardAdsBar__item boardAdsBar__item--saleBuy'} onClick={() => dispatch(changeSelectedCategory('Продам/куплю'))}>
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
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--categoryMargin">Категория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--subcategoryMargin">Подкатегория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">Цена</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
      <li className={category === 'Недвижимость' ? 'boardAdsBar__item boardAdsBar__item--property boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--property'} onClick={() => dispatch(changeSelectedCategory('Недвижимость'))}>
        <Link to='/home/property' style={{ color: '#000' }}>
          <div className="boardAdsBar__categoryContainer">
            <SvgColor svg={House} colors={category === 'Недвижимость' ? ['#fff'] : ['#616C7A']} />
            <span className='boardAdsBar__text' style={category === 'Недвижимость' ? {color: '#fff'} : null}>Недвижимость</span>
          </div>
        </Link>
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--titleMargin">Заголовок</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--cityMargin">
            <DropdownCity />
          </li>
    
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--categoryMargin">Категория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--subcategoryMargin">Подкатегория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--floarMargin">Этаж</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--roomsMargin">Комнат</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">Цена</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--squareMargin">Площадь</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
      <li className={category === 'Авто' ? 'boardAdsBar__item boardAdsBar__item--auto boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--auto'} onClick={() => dispatch(changeSelectedCategory('Авто'))}>
        <Link to='/home/auto' style={{ color: '#000' }}>
          <div className="boardAdsBar__categoryContainer">
            <SvgColor svg={CarIcon} colors={category === 'Авто' ? ['#fff'] : ['#616C7A']} />
            <span className='boardAdsBar__text'style={category === 'Авто' ? {color: '#fff'} : null}> Авто</span>
          </div>
        </Link>
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--titleMargin">Заголовок</li>
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
      <li className={category === 'Услуги' ? 'boardAdsBar__item boardAdsBar__item--services boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--services'} onClick={() => dispatch(changeSelectedCategory('Услуги'))}>
        <Link to='/home/services' style={{ color: '#000' }}>
          <div className="boardAdsBar__categoryContainer">
            <SvgColor svg={people} colors={category === 'Услуги' ? ['#fff'] : ['#616C7A']} />
            <span className='boardAdsBar__text' style={category === 'Услуги' ? {color: '#fff'} : null}>Услуги</span>
          </div>
        </Link>
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--titleMargin">Заголовок</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--cityMargin">
            <DropdownCity />
          </li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--categoryMargin">Категория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--subcategoryMargin">Подкатегория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--floarMargin">Вид</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--roomsMargin">Тип</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">Цена</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
      <li className={category === 'Работа' ? 'boardAdsBar__item boardAdsBar__item--work boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--work'} onClick={() => dispatch(changeSelectedCategory('Работа'))}>
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
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--categoryMargin">Категория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--subcategoryMargin">Подкатегория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--floarMargin">Вид</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--roomsMargin">Тип</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">Цена</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
      <li className={category === 'Новые авто' ? 'boardAdsBar__item boardAdsBar__item--newAuto boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--newAuto'} onClick={() => dispatch(changeSelectedCategory('Новые авто'))}>
        <Link to='/home/newAuto' style={{ color: '#000' }}>
          <div className="boardAdsBar__categoryContainer">
            <SvgColor svg={newIcon} colors={category === 'Новые авто' ? ['#fff'] : ['#616C7A']} />
            <span className='boardAdsBar__text' style={category === 'Новые авто' ? {color: '#fff'} : null}>Новые авто</span>
          </div>
        </Link>
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--titleMargin">Заголовок</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--cityMargin"><DropdownCity /></li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--autoCategory">Категория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--yearOfIssue">Год выпуска</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--brand">Марка</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--model">Модель</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">Цена</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
      <li className={category === 'Новые квартиры' ? 'boardAdsBar__item boardAdsBar__item--newHouse boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--newHouse'} onClick={() => dispatch(changeSelectedCategory('Новые квартиры'))}>
        <Link to='/home/newHouse' active style={{ color: '#000' }}>
          <div className="boardAdsBar__categoryContainer">
            <SvgColor svg={newIcon} colors={category === 'Новые квартиры' ? ['#fff'] : ['#616C7A']} />
            <span className='boardAdsBar__text' style={category === 'Новые квартиры' ? {color: '#fff'} : null}>Новые квартиры</span>
          </div>
        </Link>
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--titleMargin">Заголовок</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--cityMargin">
            <DropdownCity />
          </li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--categoryMargin">Категория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--subcategoryMargin">Подкатегория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--floarMargin">Этаж</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--roomsMargin">Комнат</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">Цена</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--squareMargin">Площадь</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
      <li className={category === 'favorites' ? 'boardAdsBar__item boardAdsBar__item--favorites boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--favorites'} onClick={() => dispatch(changeSelectedCategory('favorites'))}>
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
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--photoMargin">Фото</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--categoryMargin">Категория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--subcategoryMargin">Подкатегория</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--floarMargin">Этаж</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--roomsMargin">Комнат</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--priceMargin">Цена</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--squareMargin">Площадь</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
    </ul>
  )
}
