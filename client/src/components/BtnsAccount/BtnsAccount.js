import React,{useState,useEffect} from 'react'
import './BtnsAccount.scss'
import { NavLink } from 'react-router-dom'

export default function BtnsAccount({ isAuth }) {

  const [ auth,setAuth ] = useState(false)

  useEffect(() => {

    if(isAuth) {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [isAuth])

  return (
    <div className='btnsAccount'>
      <div className='btnsAccount__btnContainer'>
        <NavLink to={isAuth ? '/newAd' : '/auth'}>
          <button className='btnsAccount__btnNewAd btnsAccount__btn'>Подать объявление</button>
        </NavLink>
      </div>
      <div className='btnsAccount__btnContainer'>
        <NavLink to={isAuth ? '/account' : '/auth'}>
          <button className='btnsAccount__btn btnsAccount__btnAccount'>Личный кабинет</button>
        </NavLink>
      </div>
    </div>
  )
}
