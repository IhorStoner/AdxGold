import React from 'react'
import './SubmitPopup.scss'

export default function SubmitPopup({text, subtext, btnOkText, btnNoText, setSubmitPopup, btnOkAction, adId}) {
  return (
    <div className="fixed-overlay">
      <div className='modal'>
        <div className="modal_container">
          <div className="submitPopup">
            <p className="submitPopup__text">{text}</p>
            <p className='submitPopup__subtext'>{subtext}</p>
            <div className="submitPopup__btns">
              <button className="submitPopup__btn submitPopup__btn--no" onClick={() => setSubmitPopup('')}>
                {btnNoText}
              </button>
              <button className="submitPopup__btn submitPopup__btn--ok" onClick={() => btnOkAction(adId)}>
                {btnOkText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
