import React from 'react'
import './AlertPopup.scss'

export default function AlertPopup({onClick}) {
  return (
    <div className='alertPopup'>
      <div className='alertPopup__content'>
        <p>Ввойдите или зарегистрируйтесь</p>
        <button className='alertPopup__btn' onClick={() => onClick()}>Ok</button>
      </div>
      
    </div>
  )
}
