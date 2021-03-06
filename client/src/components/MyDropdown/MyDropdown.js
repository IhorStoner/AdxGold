import React,{useState} from 'react'
import './MyDropdown.scss'

export default function MyDropdown({arr, placeholder, onChange,value = '',handleBtnReset, className }) {
  const [selectedItem, setSelectedItem] = useState(value)
  const [isOpen, setIsOpen] = useState(false)

  const onClickItemList = (e) => {
    handleBtnReset && handleBtnReset()
    setSelectedItem(e.target.innerText)
    setIsOpen(isOpen ? false : true)
    onChange(e)
  }

  const handleBtnClose = (e) => {
    setSelectedItem('')
    setIsOpen(false)
    handleBtnReset && handleBtnReset()
    onChange(e)
  }

  return (
    <div className={`myDropdown ${className}`} tabIndex="0" onBlur={() => setIsOpen(false)}>
      {selectedItem && <button onClick={(e) => handleBtnClose(e)} value='' className='myDropdown__btnReset'></button>}
      {!selectedItem && <span className='myDropdown__arrow'></span>}
      <div className="myDropdown__selected" onClick={() => setIsOpen(isOpen ? false : true)}>
        <div className="myDropdown__text">
          {selectedItem ? selectedItem : placeholder}
        </div> 
      </div>
      <div className="myDropdown__list" style={isOpen ? { display: 'flex' } : { display: 'none' }}>
        {arr && arr.map(item => (
          <div className='myDropdown__item' onClick={(e) => onClickItemList(e)}>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}
