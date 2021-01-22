import React from 'react'
import accountPhoto from '../../assets/png/accountPhoto.png'
import './AccountNavbar.scss'
import { Link,useRouteMatch,NavLink } from 'react-router-dom'
import plus from '../../assets/svg/plusOrange.svg'
import docOrange from '../../assets/svg/docOrange.svg'
import favorites from '../../assets/svg/favorites.svg'
import settings from '../../assets/svg/settings.svg'
import logout from '../../assets/svg/logout.svg'

export default function AccountNavbar({ user,activeNav,setSubmitPopup,setEditAdId}) {
  let {path, url} = useRouteMatch();
  const test = path.split('/')
  const handleNavClick = (activeNav) => {
    setEditAdId('')
  } 

  return (
    <div className='accountNavbar'>
      <div className="accountNavbar__content">
        <img src={accountPhoto} alt="photo" />
        <div className="accountNavbar__userName accountNavbar__itemText">
          {user.name && user.name}
        </div>
        <NavLink to={`/account/newOffer`} className={`accountNavbar__addNewOffer accountNavbar__item ${activeNav === 'newOffer' && 'accountNavbar__item--active'}`} onClick={() => handleNavClick('newOffer')}>
          <img src={plus} alt="icon" className='accountNavbar__itemIcon'/>
          <div className='accountNavbar__itemText--uppercase accountNavbar__itemText'>Добавить объявление</div>
        </NavLink>
        <NavLink to='/account/myOffers' className={`accountNavbar__myOffers accountNavbar__item ${activeNav === 'myOffers' && 'accountNavbar__item--active'}`} onClick={() => handleNavClick('myOffers')}>
          <img src={docOrange} alt="icon" className='accountNavbar__itemIcon'/>
          <p className='accountNavbar__itemText accountNavbar__itemText--uppercase '>Мои объявления:</p>
          <span className="accountNavbar__counter">
            {user.ads && user.ads.length}
          </span>
        </NavLink>
        <NavLink to='/account/favorites' className={`accountNavbar__favorites accountNavbar__item ${activeNav === 'favorites' && 'accountNavbar__item--active'}`} onClick={() => handleNavClick('favorites')}>
          <img src={favorites} alt="icon" className='accountNavbar__itemIcon'/>
          <p className="accountNavbar__favoritesText accountNavbar__itemText accountNavbar__itemText--uppercase">
            Избранное:
          </p>
          <span className='accountNavbar__counter'>
            {user.favoritesArr && user.favoritesArr.length}
          </span>
        </NavLink>
        <NavLink to='/account/settings' className={`accountNavbar__setting accountNavbar__item ${activeNav === 'settings' && 'accountNavbar__item--active'}`} onClick={() => handleNavClick('settings')}>
          <img src={settings} alt="icon" className='accountNavbar__itemIcon'/>
          <p className="accountNavbar__settingText accountNavbar__itemText accountNavbar__itemText--uppercase">
            Настройки
          </p>
        </NavLink>
        <div className="accountNavbar__logout accountNavbar__item" onClick={() => setSubmitPopup('exit')}>
          <img src={logout} alt="icon" className='accountNavbar__itemIcon'/>
          <p className="accountNavbar__logoutText accountNavbar__itemText accountNavbar__itemText--uppercase">
            Выйти
          </p>
        </div>
      </div>
    </div>
  )
}
