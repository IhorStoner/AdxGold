import React from 'react'
import './Navbar.scss'

export default function Navbar() {
  return (
    <nav className='navbar navbar--ml'>
      <ul className='navbar__list'>
        <li className='navbar__item navbar__item--active navbar__board'>
          <span>Доска объявлений</span>
          <ul className='navbar__submenu'>
            <li>Продам/Куплю</li>
            <li>Недвижимость</li>
            <li>Авто</li>
            <li>Услуги</li>
            <li>Работа</li>
            <li>Новые авто</li>
            <li>Новые квартиры</li>
            <li>Блогеры</li>
          </ul>
        </li>
        <li className='navbar__item navbar__market'>
          Рынок, Магазины
          <ul className='navbar__submenu '>
            <li>Case 1</li>
            <li>Case 2</li>
            <li>Case 3</li>
            <li>Case 4</li>
          </ul>
        </li>
        <li className='navbar__item'>
          Заказ еды/Рестораны
          <ul className='navbar__submenu '>
            <li>Case 5</li>
            <li>Case 6</li>
            <li>Case 7</li>
            <li>Case 8</li>
          </ul>
        </li>
        <li className='navbar__item'>
          Услуги профессионалов
          <ul className='navbar__submenu '>
            <li>Case 9</li>
            <li>Case 10</li>
            <li>Case 11</li>
            <li>Case 12</li>
          </ul>
        </li>
      </ul>
      <div className="navbar__box"></div>
    </nav>
  )
}
