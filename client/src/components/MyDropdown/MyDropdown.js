import React,{useState} from 'react'
import './MyDropdown.scss'

export default function MyDropdown({arr, placeholder, onChange,value = '' }) {
  const [selectedItem, setSelectedItem] = useState(value)
  const [isOpen, setIsOpen] = useState(false)

  const onClickItemList = (e) => {
    setSelectedItem(e.target.innerText)
    setIsOpen(isOpen ? false : true)
    onChange(e)
  }

  const handleBtnClose = () => {
    setSelectedItem('')
    setIsOpen(false)
  }

  return (
    <div className='myDropdown' tabIndex="0" onBlur={() => setIsOpen(false)}>
      {selectedItem && <button onClick={() => handleBtnClose()} className='dropdown__btnReset'></button>}
      {!selectedItem && <span className='dropdown__arrow'></span>}
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
