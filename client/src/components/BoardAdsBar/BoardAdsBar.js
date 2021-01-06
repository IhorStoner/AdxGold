import React, { useState } from 'react'
import './BoardAdsBar.scss'
import arms from '../../assets/svg/armsIcon.svg'
import armsActive from '../../assets/svg/armsIconActive.svg'
import house from '../../assets/svg/house.svg'
import houseActive from '../../assets/svg/houseActive.svg'
import car from '../../assets/svg/car.svg'
import carActive from '../../assets/svg/carActive.svg'
import people from '../../assets/svg/people.svg'
import peopleActive from '../../assets/svg/peopleActive.svg'
import work from '../../assets/svg/work.svg'
import workActive from '../../assets/svg/workActive.svg'
import newIcon from '../../assets/svg/new.svg'
import newIconActive from '../../assets/svg/newActive.svg'
import favorites from '../../assets/svg/favorites.svg'
import DropdownCity from '../DropdownCity/DropdownCity'
// import {Dropdown} from 'semantic-ui-react'


export default function BoardAdsBar() {
  const [category, setCategory] = useState('property')


  return (
    <ul className='boardAdsBar boardAdsBar--mt'>
      <li className={category === 'saleBuy' ? 'boardAdsBar__item boardAdsBar__item--active boardAdsBar__item--saleBuy' : 'boardAdsBar__item boardAdsBar__item--saleBuy'} onClick={() => setCategory('saleBuy')}>
        <div className="boardAdsBar__categoryContainer">
          <img src={category === 'saleBuy' ? armsActive : arms} onload="SVGInject(this)" alt="Куплю,продам" />
          <span className='boardAdsBar__text'>Продам/Куплю</span>
        </div>
      </li>
      <li className={category === 'property' ? 'boardAdsBar__item boardAdsBar__item--property boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--property'} onClick={() => setCategory('property')}>
        <div className="boardAdsBar__categoryContainer">
          <img src={category === 'property' ? houseActive : house} alt="Куплю,продам" />
          <span className='boardAdsBar__text'>Недвижимость</span>
        </div>
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--titleMargin">Заголовок</li>
          <li className="boardAdsBar__subMenuItem boardAdsBar__subMenuItem--cityMargin">
            <DropdownCity/>
            {/* <Dropdown className='boardAdsBar__optionsCity' placeholder='Город' clearable search selection options={cityDataArr} onChange={(e) => setSelectedCity(e.target.innerText)} /> */}
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
      <li className={category === 'auto' ? 'boardAdsBar__item boardAdsBar__item--auto boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--auto'} onClick={() => setCategory('auto')}>
        <div className="boardAdsBar__categoryContainer">
          <img src={category === 'auto' ? carActive : car} alt="Куплю,продам" />
          <span className='boardAdsBar__text'> Авто</span>
        </div>
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem">Заголовок</li>
          <li className="boardAdsBar__subMenuItem">Город</li>
          <li className="boardAdsBar__subMenuItem">Фото</li>
          <li className="boardAdsBar__subMenuItem">Категория</li>
          <li className="boardAdsBar__subMenuItem">Год выпуска</li>
          <li className="boardAdsBar__subMenuItem">Марка</li>
          <li className="boardAdsBar__subMenuItem">Модель</li>
          <li className="boardAdsBar__subMenuItem">Цена</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
      <li className={category === 'services' ? 'boardAdsBar__item boardAdsBar__item--services boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--services'} onClick={() => setCategory('services')}>
        <div className="boardAdsBar__categoryContainer">
          <img src={category === 'services' ? peopleActive : people} alt="Куплю,продам" />
          <span className='boardAdsBar__text'>Услуги</span>
        </div>
      </li>
      <li className={category === 'work' ? 'boardAdsBar__item boardAdsBar__item--work boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--work'} onClick={() => setCategory('work')}>
        <div className="boardAdsBar__categoryContainer">
          <img src={category === 'work' ? workActive : work} alt="Куплю,продам" />
          <span className='boardAdsBar__text'>Работа</span>
        </div>
      </li>
      <li className={category === 'newAuto' ? 'boardAdsBar__item boardAdsBar__item--newAuto boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--newAuto'} onClick={() => setCategory('newAuto')}>
        <div className="boardAdsBar__categoryContainer">
          <img src={category === 'newAuto' ? newIconActive : newIcon} alt="Куплю,продам" />
          <span className='boardAdsBar__text'>Новые авто</span>
        </div>
      </li>
      <li className={category === 'newHouse' ? 'boardAdsBar__item boardAdsBar__item--newHouse boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--newHouse'} onClick={() => setCategory('newHouse')}>
        <div className="boardAdsBar__categoryContainer">
          <img src={category === 'newHouse' ? newIconActive : newIcon} alt="Куплю,продам" />
          <span className='boardAdsBar__text'>Новые квартиры</span>
        </div>
      </li>
      <li className={category === 'favorites' ? 'boardAdsBar__item boardAdsBar__item--favorites boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--favorites'} onClick={() => setCategory('favorites')}>
        <div className="boardAdsBar__categoryContainer">
          <img src={category === 'favorites' ? favorites : favorites} alt="Куплю,продам" />
          <span className='boardAdsBar__text'>Избранное</span>
        </div>
      </li>
    </ul>
  )
}
