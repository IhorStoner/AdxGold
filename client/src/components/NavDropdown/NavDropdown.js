import React,{useState} from 'react'
import './NavDropdown.scss'
import {useDispatch} from 'react-redux'


export default function NavDropdown({arr, placeholder, onChange,value = '', action}) {
  const [selectedItem, setSelectedItem] = useState(value)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const onClickItemList = (e) => {
    setSelectedItem(e.target.innerText)
    setIsOpen(isOpen ? false : true)
    onChange(e.target.innerText)
    dispatch(action(e.target.innerText))
  }

  const handleBtnClose = (e) => {
    setSelectedItem('')
    onChange('')
    dispatch(action(''))
    setIsOpen(false)
  }


  return (
    <div className='NavDropdown' tabIndex="0" onBlur={() => setIsOpen(false)}>
      {selectedItem && <button onClick={() => handleBtnClose()} className='NavDropdown__btnReset'></button>}
      {!selectedItem && <span className='NavDropdown__arrow'></span>}
      <div className="NavDropdown__selected" onClick={() => setIsOpen(isOpen ? false : true)}>
        <div className="NavDropdown__text">
          {selectedItem ? selectedItem : placeholder}
        </div> 
      </div>
      <div className="NavDropdown__list" style={isOpen ? { display: 'flex' } : { display: 'none' }}>
        {arr && arr.map(item => (
          <div className='NavDropdown__item' onClick={(e) => onClickItemList(e)}>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}
