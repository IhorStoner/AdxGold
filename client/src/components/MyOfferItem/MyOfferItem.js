import React from 'react'
import camera from '../../assets/svg/camera.svg'
import './MyOfferItem.scss'
import { Link } from 'react-router-dom'

export default function MyOfferItem({ ad, setSubmitPopup, setEditAdId }) {

  return (
    <div className='myOfferItem'>
      <table className={`adsList__table ${ad.status}`}>
        <tr className='adsList__row'>
          <td className='adsList__tableItem adsList__itemTitle adsList__tableItem--titleMargin'><span className='adsList__tableText'>{ad.title}</span></td>
          <td className='adsList__tableItem adsList__itemCity'><span className='adsList__tableText'>{ad.city}</span></td>
          <td className='adsList__tableItem adsList__itemSection adsList__tableItem--wordWrap'><span className='adsList__tableText adsList__tableText--textWrap'>{ad.section}</span></td>
          <td className='adsList__tableItem adsList__itemType'><span className='adsList__tableText'>{ad.subsection}</span></td>
          <td className='adsList__tableItem adsList__itemPrice'><span className='adsList__tableText'>{ad.productPrice}руб. </span></td>
          <td className='adsList__tableItem adsList__itemImg adsList__tableItem--imgMargin'><span className='adsList__tableImg'>{ad.img[0] && <img src={camera} width='25' height='25' />}</span></td>
          <td className='adsList__tableItem adsList__itemDate'><span className='adsList__tableText adsList__tableDate' >{ad.date}</span></td>
          {/* <td >
              <div className="adsList__tableBtns">
                <NavLink to={`/detailsAd/${ad._id}`} onClick={(e) => handleVisitedAd(e, ad._id)}><button data-tooltip='открыть в новом окне' className='adsList__openAd'></button></NavLink>
                <button className={favoritesId && favoritesId.includes(ad._id) ? 'adsList__btnFavorite adsList__btnFavorite--active' : 'adsList__btnFavorite'} onClick={(e) => handleFavoritesAd(e, ad._id)}></button>
                <button className="adsList__btnDetails">подробнее</button>
              </div>
            </td> */}
        </tr>
      </table>
      <div className="myOfferItem__actions">
        <Link to={`/detailsAd/${ad._id}`} className='myOfferItem__btn myOfferItem__btn--view' >Посмотреть</Link>
        <button type='button' className='myOfferItem__btn myOfferItem__btn--edit' onClick={() => setEditAdId(ad)}>Редактировать</button>
        <button type='button' className='myOfferItem__btn myOfferItem__btn--delete' onClick={() => setSubmitPopup(ad)}>Удалить</button>
      </div>
      <div className="myOfferItem__views">
        <p>Просмотры: <span className='myOfferItem__viewsCounter'>{ad.viewsAll}</span>(сегодня <span className='myOfferItem__viewsCounter'>{ad.viewsToday}</span>)</p>
      </div>
    </div>

  )
}
