import React, { useState } from 'react'
import { Button, Header } from 'semantic-ui-react'
import config from '../../config/default.json'
import logo from '../../assets/png/logo.png'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './AdvertList.scss'
import { NavLink } from 'react-router-dom'
import SalesAds from '../SalesAds/SalesAds'
import RecomendedAds from '../RecommendedAds/RecommendedAds'
import HotsAds from '../HotsAds/HotsAds'
import { getHotsAds } from '../../redux/selectors/adsSelector'
import { useSelector } from 'react-redux'
export default function AdvertList({ advertArr, recommendedAds, hotsAds }) {
	const [isOpenInfo, setIsOpenInfo] = useState('')
	const [imgId, setImgId] = useState('')


	return (
		<ul className='adsList'>
			{advertArr.map((ad, i) => (
				<div key={i}>
					<li className={`adsList__item ${ad.status}`} onClick={ad._id === isOpenInfo ? () => setIsOpenInfo('') : () => setIsOpenInfo(ad._id)}>
						<span>{ad.city} </span>
						<span><img src={!ad.img[0] ? logo : `${config.serverUrl}/api/images/${ad.img[0]}`} width='50' height='50' /></span>
						<span>{ad.title}</span>
						<span>{ad.type}</span>
						<span>{ad.date}</span>
						<span>{ad.productPrice}$ </span>
						<NavLink to={`/detailsAd/${ad._id}`}><Button>Открыть в новом окне</Button></NavLink>
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
