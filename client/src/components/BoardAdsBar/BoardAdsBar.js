import React,{useState} from 'react'
import './BoardAdsBar.scss'
import arms from '../../assets/svg/armsIcon.svg'
export default function BoardAdsBar() {
  const [ category, setCategory ] = useState('saleBuy')

  return (
    <ul className='boardAdsBar boardAdsBar--mt'>
      <li className={category === 'saleBuy' ? 'boardAdsBar__item boardAdsBar__item--active boardAdsBar__item--saleBuy' : 'boardAdsBar__item boardAdsBar__item--saleBuy'} onClick={() => setCategory('saleBuy')}>
        {/* <img src={arms} alt=""/> */}
        Продам/Куплю
      </li>
      <li className={category === 'property' ? 'boardAdsBar__item boardAdsBar__item--property boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--property'} onClick={() => setCategory('property')}>
        Недвижимость
        <ul className="boardAdsBar__subMenu">
          <li className="boardAdsBar__subMenuItem">Заголовок</li>
          <li className="boardAdsBar__subMenuItem">Город</li>
          <li className="boardAdsBar__subMenuItem">Фото</li>
          <li className="boardAdsBar__subMenuItem">Категория</li>
          <li className="boardAdsBar__subMenuItem">Подкатегория</li>
          <li className="boardAdsBar__subMenuItem">Этаж</li>
          <li className="boardAdsBar__subMenuItem">Комнат</li>
          <li className="boardAdsBar__subMenuItem">Цена</li>
          <li className="boardAdsBar__subMenuItem">Площадь</li>
          <li className="boardAdsBar__subMenuItem">Дата</li>
        </ul>
      </li>
      <li className={category === 'auto' ? 'boardAdsBar__item boardAdsBar__item--auto boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--auto'} onClick={() => setCategory('auto')}>
        Авто
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
      <li className={category === 'services' ? 'boardAdsBar__item boardAdsBar__item--services boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--services'} onClick={() => setCategory('services')}>Услуги</li>
      <li className={category === 'work' ? 'boardAdsBar__item boardAdsBar__item--work boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--work'} onClick={() => setCategory('work')}>Работа</li>
      <li className={category === 'newAuto' ? 'boardAdsBar__item boardAdsBar__item--newAuto boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--newAuto'} onClick={() => setCategory('newAuto')}>Новые авто</li>
      <li className={category === 'newHouse' ? 'boardAdsBar__item boardAdsBar__item--newHouse boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--newHouse'} onClick={() => setCategory('newHouse')}>Новые квартиры</li>
      <li className={category === 'favorites' ? 'boardAdsBar__item boardAdsBar__item--favorites boardAdsBar__item--active' : 'boardAdsBar__item boardAdsBar__item--favorites'} onClick={() => setCategory('favorites')}>Избранное</li>
    </ul>
  )
}
