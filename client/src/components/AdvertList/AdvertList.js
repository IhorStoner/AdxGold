import React, { useState } from 'react'
import config from '../../config/default.json'
import camera from '../../assets/svg/camera.svg'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'reactjs-popup/dist/index.css';
import './AdvertList.scss'
import { NavLink,useRouteMatch } from 'react-router-dom'
import RunAd from '../RunAd/RunAd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites, getUser } from '../../redux/selectors/userSelector';
import { fetchUser } from '../../redux/actions/userAction'
import { useAuth } from '../../hooks/useAuth'
import AlertPopup from '../AlertPopup/AlertPopup';
import OpenOffer from '../OpenOffer/OpenOffer'
import { getCategory } from '../../redux/selectors/categorySelector';

export default function AdvertList({ advertArr, recommendedAds, hotsAds, runAds }) {
	const { token, userId } = useAuth()
	const isAuth = !!token;
	const [isOpenInfo, setIsOpenInfo] = useState('')
	const [imgId, setImgId] = useState('')
	const [visitedAds, setVisitedAds] = useState(() => !localStorage.getItem('visitedAd') ? localStorage.setItem('visitedAd', JSON.stringify([])) : localStorage.getItem('visitedAd'))
	const favoritesId = useSelector(getFavorites)
	const user = useSelector(getUser)
	const [isAlertOpen, setIsAlertOpen] = useState(false)
	const dispatch = useDispatch();
	const match = useRouteMatch();
	const category = useSelector(getCategory)

	const handleVisitedAd = async (e, adId) => {
		e.stopPropagation()
		const ads = JSON.parse(localStorage.getItem('visitedAd'))

		if (!ads) {
			localStorage.setItem('visitedAd', JSON.stringify([adId]))
		} else {
			localStorage.setItem('visitedAd', JSON.stringify([...ads, adId]))
		}
	}

	const handleFavoritesAd = async (e, adId) => {
		e.stopPropagation()
		if (!userId) {
			setIsAlertOpen(true)
		} else {
			await axios.put(`${config.serverUrl}/api/users/favoritesAd/${user._id}`, [adId]).then(res => dispatch(fetchUser()))
		}
	}

	const handleOpenPhoto = (e, imgs) => {
		setImgId(imgs)
	}

	return (
		<ul className='adsList'>
			{isAlertOpen && <AlertPopup onClick={(e) => setIsAlertOpen(false)} />}
			{!advertArr ? <div className='adsList__alertEmpty'>Здесь пока пусто</div> : advertArr.map((ad, i) => (
				<div key={i}>
					{i === 3 && <RunAd runAds={runAds} />}
					<li style={visitedAds && visitedAds.includes(ad._id) ? { backgroundColor: '#FFC8C8' } : null} className={`adsList__item ${ad.status}`} onClick={ad._id === isOpenInfo ? () => setIsOpenInfo('') : () => setIsOpenInfo(ad._id)}>
						<table className='adsList__table'>
							<tr className='adsList__row'>
								<td className='adsList__tableItem adsList__itemTitle adsList__tableItem--titleMargin'><span className='adsList__tableText'>{ad.title}</span></td>
								<td className='adsList__tableItem adsList__itemCity'><span className='adsList__tableText'>{ad.city}</span></td>
								<td className='adsList__tableItem adsList__itemSection adsList__tableItem--wordWrap'><span className='adsList__tableText adsList__tableText--textWrap'>{ad.section}</span></td>
								<td className='adsList__tableItem adsList__itemType'><span className='adsList__tableText'>{ad.subsection}</span></td>
								<td className='adsList__tableItem adsList__itemPrice'><span className='adsList__tableText'>{ad.productPrice}руб. </span></td>
								<td className='adsList__tableItem adsList__itemImg adsList__tableItem--imgMargin' onClick={(e) => handleOpenPhoto(e, ad.img)}><span className='adsList__tableImg'>{ad.img[0] && <img src={camera} width='25' height='25' />}</span></td>
								<td className='adsList__tableItem adsList__itemDate'><span className='adsList__tableText adsList__tableDate' >{ad.date}</span></td>
								<td >
									<div className="adsList__tableBtns">
										<NavLink to={`/detailsAd/${ad._id}`} onClick={(e) => handleVisitedAd(e, ad._id)}><button data-tooltip='открыть в новом окне' className='adsList__openAd'></button></NavLink>
										<button className={favoritesId && favoritesId.includes(ad._id) ? 'adsList__btnFavorite adsList__btnFavorite--active' : 'adsList__btnFavorite'} onClick={(e) => handleFavoritesAd(e, ad._id)}></button>
										<button className="adsList__btnDetails">подробнее</button>
									</div>
								</td>
							</tr>
						</table>
					</li>
					<div className='adsList__info' style={isOpenInfo === ad._id ? { display: 'block' } : { display: 'none' }}>
						<OpenOffer ad={ad} setImgId={setImgId} imgId={imgId}/>
					</div>
				</div>
			))}
		</ul>
	)
}
