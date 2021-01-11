import React, { useState } from 'react'
import { Button, Header } from 'semantic-ui-react'
import config from '../../config/default.json'
import camera from '../../assets/svg/camera.svg'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'reactjs-popup/dist/index.css';
import './AdvertList.scss'
import { NavLink } from 'react-router-dom'
import RecomendedAds from '../RecommendedAds/RecommendedAds'
import HotsAds from '../HotsAds/HotsAds'
import RunAd from '../RunAd/RunAd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites, getUser } from '../../redux/selectors/userSelector';
import { fetchUser } from '../../redux/actions/userAction'


export default function AdvertList({ advertArr, recommendedAds, hotsAds, runAds }) {
	const [isOpenInfo, setIsOpenInfo] = useState('')
	const [imgId, setImgId] = useState('')
	const [ visitedAds, setVisitedAds ] = useState(() => !localStorage.getItem('visitedAd') ? localStorage.setItem('visitedAd', JSON.stringify([])) : localStorage.getItem('visitedAd'))
	const favorites = useSelector(getFavorites)
	const user = useSelector(getUser)
	const dispatch = useDispatch();

	const handleVisitedAd = async (e,adId) => {
		e.stopPropagation()
		const ads = JSON.parse(localStorage.getItem('visitedAd'))

		if(!ads) {
			localStorage.setItem('visitedAd',JSON.stringify([adId]))
		} else {
			localStorage.setItem('visitedAd',JSON.stringify([...ads, adId]))
		}
	}

	const handleFavoritesAd = async (e,adId) => {
		e.stopPropagation()
		await axios.put(`${config.serverUrl}/api/users/favoritesAd/${user._id}`,[adId]).then(res => dispatch(fetchUser()))
	}

	return (
		<ul className='adsList'>
			{advertArr.map((ad, i) => (
				<div key={i}>
					{i === 3 && <RunAd runAds={runAds} />}
					<li style={visitedAds && visitedAds.includes(ad._id) ? {backgroundColor: '#FFC8C8'} : null} className={`adsList__item ${ad.status}`} onClick={ad._id === isOpenInfo ? () => setIsOpenInfo('') : () => setIsOpenInfo(ad._id)}>
						<table className='adsList__table'>
							<tr className='adsList__row'>
								<td  className='adsList__tableItem adsList__itemTitle adsList__tableItem--titleMargin'><span className='adsList__tableText'>{ad.title}</span></td>
								<td  className='adsList__tableItem adsList__itemCity'><span className='adsList__tableText'>{ad.city}</span></td>
								<td  className='adsList__tableItem adsList__itemImg adsList__tableItem--imgMargin'><span className='adsList__tableImg'>{ad.img[0] && <img src={camera} width='50' height='50' />}</span></td> {/*!ad.img[0] ? camera : `${config.serverUrl}/api/images/${ad.img[0] */}
								<td  className='adsList__tableItem adsList__itemSection adsList__tableItem--wordWrap'><span className='adsList__tableText'>{ad.section}</span></td>
								<td  className='adsList__tableItem adsList__itemType'><span className='adsList__tableText'>{ad.type}</span></td>
								<td  className='adsList__tableItem adsList__itemFloor'><span className='adsList__tableText'>{ad.floor ? ad.floor : '0'}</span></td>
								<td className='adsList__tableItem adsList__itemRooms'><span className='adsList__tableText'>{ad.rooms ? ad.rooms : '1 комн.'}</span></td>
								<td  className='adsList__tableItem adsList__itemPrice'><span className='adsList__tableText'>{ad.productPrice}руб. </span></td>
								<td className='adsList__tableItem adsList__itemSquare'><span className='adsList__tableText'>{ad.square ? ad.square : '30 кв.м.'}</span></td>
								<td  className='adsList__tableItem adsList__itemDate'><span className='adsList__tableDate' className='adsList__tableText'>{ad.date}</span></td>
								<td  >
									<div className="adsList__tableBtns">
										<NavLink to={`/detailsAd/${ad._id}`} onClick={(e) => handleVisitedAd(e,ad._id)}><button data-tooltip='открыть в новом окне' className='adsList__openAd'></button></NavLink>
										<button className={favorites && favorites.includes(ad._id) ? 'adsList__btnFavorite adsList__btnFavorite--active' : 'adsList__btnFavorite'} onClick={(e) => handleFavoritesAd(e,ad._id)}></button>
										<button className="adsList__btnDetails">подробнее</button>
									</div>
								</td>
							</tr>
						</table>
					</li>
					<div className='adsList__info' style={isOpenInfo === ad._id ? { display: 'flex' } : { display: 'none' }}>
						<div className="adsList__content">
							<div className="adsList__infoContainer">
								<div className="adsList__titleContainer">
									<h2>{ad.title}</h2>
									<p>{ad.description}</p>
								</div>
								<div className="adsList__photoContainer">
									<h3>Фото:</h3>
									<div className="adsList__sliderContainer">
										<Carousel >
											{ad.img.map(img => (
												<div onClick={() => setImgId(img)}>
													<img src={`${config.serverUrl}/api/images/${img}`} />
												</div>
											))}
										</Carousel>
										{
											imgId &&
											<div className="fixed-overlay" onClick={() => setImgId('')}>
												<div className='modal'>
													<div className="modal_container">
														<img className='adsList__popupImg' src={`${config.serverUrl}/api/images/${imgId}`} width='500' />
													</div>
												</div>
											</div>
										}
									</div>
								</div>
							</div>
							<div className="adsList__infoContainer">
								<div>
									<h2>Данные объявление</h2>
									<p>{ad.city}</p>
									<p>Тип{ad.type}</p>
									<p>{ad.section}</p>
									<p>{ad.subsection}</p>
									<p>Цена: {ad.productPrice}</p>
								</div>
								<div>
									<h3>Контакты:</h3>
									<p>Имя: {ad.name}</p>
									<p>Телефон: {ad.phone}</p>
									<p><Button>Отправить сообщение</Button></p>
								</div>
							</div>
							{recommendedAds &&
								<div className='recommended-ads'>
									<Header>Рекомендуемые</Header>
									<RecomendedAds recommendedAds={recommendedAds} />
								</div>
							}
						</div>
						{
							hotsAds &&
							<div className="adsList__content adsList__hots">
								<Header as='h2'>Горячие</Header>
								<HotsAds hotsAds={hotsAds} />
							</div>
						}
					</div>
				</div>
			))}
		</ul>
	)
}
