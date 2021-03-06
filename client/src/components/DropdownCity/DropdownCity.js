import React, { useState } from 'react'
import './DropdownCity.scss'
import * as cityData from '../../assets/json/russian-cities.json'
import { useDispatch } from 'react-redux'
import { changeSelectedCity } from '../../redux/actions/dropdownAction'

export default function DropdownCity({className}) {
  const dispatch = useDispatch();
  // options for city filter
  const [cityDataArr, setCityDataArr] = useState(() => {
    const data = JSON.parse(JSON.stringify(cityData.default))
    const filteredCity = data.filter(item => item.population > 500000)
    const optionsCity = filteredCity.map((item, i) => {
      return { key: i, text: item.name, value: item.name }
    })
    return optionsCity
  }) 

  const [selectedItem, setSelectedItem] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const onClickItemList = (e) => {
    setSelectedItem(e.target.innerText)
    dispatch(changeSelectedCity(e.target.innerText))
    setIsOpen(isOpen ? false : true)
  }

  const handleBtnClose = () => {
    dispatch(changeSelectedCity(''))
    setSelectedItem('')
    setIsOpen(false)
  }

  return (
    <div className={`dropdown ${className}`} tabIndex="0" onBlur={() => setIsOpen(false)}>
      {selectedItem && <button onClick={() => handleBtnClose()} className='dropdown__btnReset'></button>}
      {!selectedItem && <span className='dropdown__arrow'></span>}
      <div className="dropdown__selected" onClick={() => setIsOpen(isOpen ? false : true)}>
        <div className="dropdown__text">
          {selectedItem ? selectedItem : 'Город'}
        </div> 
      </div>
      <div className="dropdown__list" style={isOpen ? { display: 'flex' } : { display: 'none' }}>
        {cityDataArr.map(item => (
          <div className='dropdown__item' onClick={(e) => onClickItemList(e)}>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}
