import React, { useState } from 'react'
import config from '../../config/default.json'
import camera from '../../assets/svg/camera.svg'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'reactjs-popup/dist/index.css';
import './AdvertList.scss'
import { NavLink,useParams } from 'react-router-dom'
import RunAd from '../RunAd/RunAd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites, getUser } from '../../redux/selectors/userSelector';
import {isOpenAd as openAd } from '../../redux/selectors/adsSelector'
import { setIsOpenAd } from '../../redux/actions/adsAction'
import { useAuth } from '../../hooks/useAuth'
import AlertPopup from '../AlertPopup/AlertPopup';
import OpenOffer from '../OpenOffer/OpenOffer'
import { fetchUser } from '../../redux/actions/userAction';

export default function AdvertList({ advertArr, runAds, recommendedAds }) {
	const { token, userId } = useAuth()
	const isAuth = !!token;
	// const [isOpenAd, setIsOpenAd] = useState('')
	const isOpenAd = useSelector(openAd)
	const dispatch = useDispatch()
	const [imgId, setImgId] = useState('')
	const [visitedAds, setVisitedAds] = useState(() => !localStorage.getItem('visitedAd') ? localStorage.setItem('visitedAd', JSON.stringify([])) : localStorage.getItem('visitedAd'))
	const favoritesId = useSelector(getFavorites)
	const user = useSelector(getUser)
	const [isAlertOpen, setIsAlertOpen] = useState(false)
	const {nav} = useParams();

	const handleVisitedAd = async (e, adId) => {
		e.stopPropagation()
		const ads = JSON.parse(localStorage.getItem('visitedAd'))

		if (!ads) {
			localStorage.setItem('visitedAd', JSON.stringify([adId]))
		} else {
			if(ads.includes(adId)) {
				return
			} else {
				localStorage.setItem('visitedAd', JSON.stringify([...ads, adId]))
				const viewsAd = await axios.put(`${config.serverUrl}/api/offer/views/${adId}`,adId)
			}
		}
	}

	const handleFavoritesAd = async (e, adId) => {
		e.stopPropagation()
		if (!userId) {
			setIsAlertOpen(true)
		} else {
			await axios.put(`${config.serverUrl}/api/users/favoritesAd/${user._id}`, [adId]).then(res => {
				dispatch(fetchUser())
			})
			e.target.classList.toggle('adsList__btnFavorite--active')
		}
	}

	const handleOpenPhoto = (e, imgs) => {
		setImgId(imgs)
	}

	const handleClickOffer = (e, ad) => {
		console.log(isOpenAd)
		e.currentTarget.style.background = '#FFC8C8'
		handleVisitedAd(e, ad._id)
		ad._id === isOpenAd ? dispatch(setIsOpenAd(false)) : dispatch(setIsOpenAd(ad._id))
	}

	return (
		<ul className='adsList'>
			{isAlertOpen && <AlertPopup onClick={(e) => setIsAlertOpen(false)} />}
			{advertArr && advertArr.map((ad, i) => (
				<div key={i}>
					{i === 3 && <RunAd runAds={runAds} />}
					<li style={visitedAds && visitedAds.includes(ad._id) ? { backgroundColor: '#FFC8C8' } : null} className={`adsList__item ${ad.status}`} onClick={(e) => handleClickOffer(e,ad)}>
						<table className='adsList__table'>
							<tr className='adsList__row'>
								<td className={`adsList__tableItem adsList__itemTitle ${nav === 'saleBuy' && 'adsList__tableItem--titleMargin' || nav === 'property' && 'adsList__tableItem--propertyTitle'}`}><span className='adsList__tableText'>{ad.title}</span></td>
								<td className={`adsList__tableItem adsList__itemCity`}><span className='adsList__tableText'>{ad.city}</span></td>
								<td className={`adsList__tableItem adsList__itemSection adsList__tableItem--wordWrap ${nav === 'property' &&  'adsList__tableItem--categoryProperty'}`}><span className='adsList__tableText adsList__tableText--textWrap'>{ad.section}</span></td>
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
					<div className='adsList__info' style={isOpenAd === ad._id ? { display: 'block' } : { display: 'none' }}>
						<OpenOffer ad={ad} setImgId={setImgId} imgId={imgId}/>
					</div>
				</div>
			))}
		</ul>
	)
}
