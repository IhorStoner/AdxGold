import React,{useState} from 'react'

import './Navbar.scss'

export default function Navbar() {
  const [ active, setActive ] = useState('board')

  return (
    <nav className='navbar navbar--ml'>
      <ul className='navbar__list'>
        <li className={active === 'board' ? 'navbar__item navbar__item--board navbar__item--active' : 'navbar__item navbar__item--board'} onClick={() => setActive('board')}>
          Доска объявлений
        </li>
        <li className={active === 'market' ? 'navbar__item navbar__item--market navbar__item--active' : 'navbar__item navbar__item--market'} onClick={() => setActive('market')}>
          Рынок, Магазины
        </li>
        <li className={active === 'food' ? 'navbar__item navbar__item--food navbar__item--active' : 'navbar__item navbar__item--food'} onClick={() => setActive('food')}>
          Заказ еды/Рестораны
        </li>
        <li className={active === 'services' ? 'navbar__item navbar__item--services navbar__item--active' : 'navbar__item navbar__item--services'} onClick={() => setActive('services')}>
          Услуги профессионалов
        </li>
      </ul>
      <div className="navbar__box"></div>
    </nav>
  )
}
