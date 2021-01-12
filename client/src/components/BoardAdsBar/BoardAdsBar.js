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

export default function BoardAdsBar() {
  // const [category, setCategory] = useState('property')
  const category = useSelector(getCategory)

  const dispatch = useDispatch()

  return (
    <ul className='boardAdsBar boardAdsBar--mt'>
      <li className={category === 'saleBuy' ? 'boardAdsBar__item boardAdsBar__item--active boardAdsBar__item--saleBuy' : 'boardAdsBar__item boardAdsBar__item--saleBuy'} onClick={() => dispatch(changeSelectedCategory('saleBuy'))}>
        <div className="boardAdsBar__categoryContainer">
          <SvgColor svg={Arms} colors={category === 'saleBuy' ? ['#fff'] : ['#616C7A']} />
          <span className='boardAdsBar__text'>Продам/Куплю</span>
        </div>
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
      <li className={category === 'property' ? 'boardAdsBar__item boardAdsBar__item--property boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--property'} onClick={() => dispatch(changeSelectedCategory('property'))}>
        <div className="boardAdsBar__categoryContainer">
          <SvgColor svg={House} colors={category === 'property' ? ['#fff'] : ['#616C7A']} />
          <span className='boardAdsBar__text'>Недвижимость</span>
        </div>
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
      <li className={category === 'auto' ? 'boardAdsBar__item boardAdsBar__item--auto boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--auto'} onClick={() => dispatch(changeSelectedCategory('auto'))}>
        <div className="boardAdsBar__categoryContainer">
          <SvgColor svg={CarIcon} colors={category === 'auto' ? ['#fff'] : ['#616C7A']} />
          <span className='boardAdsBar__text'> Авто</span>
        </div>
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
      <li className={category === 'services' ? 'boardAdsBar__item boardAdsBar__item--services boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--services'} onClick={() => dispatch(changeSelectedCategory('services'))}>
        <div className="boardAdsBar__categoryContainer">
          <SvgColor svg={people} colors={category === 'services' ? ['#fff'] : ['#616C7A']} />
          <span className='boardAdsBar__text'>Услуги</span>
        </div>
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
      <li className={category === 'work' ? 'boardAdsBar__item boardAdsBar__item--work boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--work'} onClick={() => dispatch(changeSelectedCategory('work'))}>
        <div className="boardAdsBar__categoryContainer">
          <SvgColor svg={work} colors={category === 'work' ? ['#fff'] : ['#616C7A']} alt="Куплю,продам" />
          <span className='boardAdsBar__text'>Работа</span>
        </div>
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
      <li className={category === 'newAuto' ? 'boardAdsBar__item boardAdsBar__item--newAuto boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--newAuto'} onClick={() => dispatch(changeSelectedCategory('newAuto'))}>
        <div className="boardAdsBar__categoryContainer">
          <SvgColor svg={newIcon} colors={category === 'newAuto' ? ['#fff'] : ['#616C7A']} />
          <span className='boardAdsBar__text'>Новые авто</span>
        </div>
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
      <li className={category === 'newHouse' ? 'boardAdsBar__item boardAdsBar__item--newHouse boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--newHouse'} onClick={() => dispatch(changeSelectedCategory('newHouse'))}>
        <div className="boardAdsBar__categoryContainer">
          <SvgColor svg={newIcon} colors={category === 'newHouse' ? ['#fff'] : ['#616C7A']} />
          <span className='boardAdsBar__text'>Новые квартиры</span>
        </div>
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
        <div className="boardAdsBar__categoryContainer">
          <img src={category === 'favorites' ? favorites : favorites} alt="Куплю,продам" />
          <span className='boardAdsBar__text'>Избранное</span>
        </div>
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
