import React from 'react'

export default function FormItem({text,valueForm,setValueForm,handleBtnSubmit,handleBtnReset, isInput = true, btnOkText='Сохранить'}) {

  return (
    <div className='accountSettings__form'>
    <p className="accountSettings__formTitle accountSettings__formItem">
      {text}
    </p>
    {isInput && <input className='accountSettings__formItem accountSettings__input' type="text" value={valueForm} onChange={(e) => setValueForm(e.target.value)} />}
    <div className="accountSettings__formBtns accountSettings__formItem">
      <button className='accountSettings__formBtn' type='button' onClick={() => handleBtnSubmit()}>{btnOkText}</button>
      <button className='accountSettings__formBtn' type='button' onClick={() => handleBtnReset()}>Отмена</button>
    </div>
  </div>
  )
}
