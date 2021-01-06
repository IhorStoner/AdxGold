import React, { useState } from 'react'
import { Button, Header } from 'semantic-ui-react'
import config from '../../config/default.json'
import logo from '../../assets/png/logo.png'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'reactjs-popup/dist/index.css';
import './AdvertList.scss'
import { NavLink } from 'react-router-dom'
import RecomendedAds from '../RecommendedAds/RecommendedAds'
import HotsAds from '../HotsAds/HotsAds'
import RunAd from '../RunAd/RunAd'

export default function AdvertList({ advertArr, recommendedAds, hotsAds, runAds }) {
	const [isOpenInfo, setIsOpenInfo] = useState('')
	const [imgId, setImgId] = useState('')

	return (
		<ul className='adsList'>
			{advertArr.map((ad, i) => (
				<div key={i}>
					{i === 3 && <RunAd runAds={runAds} />}
					<li className={`adsList__item ${ad.status}`} onClick={ad._id === isOpenInfo ? () => setIsOpenInfo('') : () => setIsOpenInfo(ad._id)}>
						<table >
							<tr className='adsList__table'>
								<td width='300px' className='adsList__tableItem adsList__tableItem--titleMargin'><span className='adsList__tableText'>{ad.title}</span></td>
								<td width='175px' className='adsList__tableItem'><span className='adsList__tableText'>{ad.city}</span></td>
								<td width='50px' className='adsList__tableItem adsList__tableItem--imgMargin'><span className='adsList__tableImg'><img src={!ad.img[0] ? logo : `${config.serverUrl}/api/images/${ad.img[0]}`} width='50' height='50' /></span></td>
								<td width='160px' className='adsList__tableItem adsList__tableItem--wordWrap'><span className='adsList__tableText'>{ad.section}</span></td>
								<td width='107px' className='adsList__tableItem'><span className='adsList__tableText'>{ad.type}</span></td>
								<td width='40px' className='adsList__tableItem'><span className='adsList__tableText'>{ad.floor ? ad.floor : '0'}</span></td>
								<td width='72px' className='adsList__tableItem'><span className='adsList__tableText'>{ad.rooms ? ad.rooms : '1 комн.'}</span></td>
								<td width='100px' className='adsList__tableItem'><span className='adsList__tableText'>{ad.productPrice}руб. </span></td>
								<td width='85px' className='adsList__tableItem'><span className='adsList__tableText'>{ad.square ? ad.square : '30 кв.м.'}</span></td>
								<td width='106px' className='adsList__tableItem'><span className='adsList__tableDate' className='adsList__tableText'>{ad.date}</span></td>
								<td width='155px' >
									<div className="adsList__tableBtns">
										<NavLink to={`/detailsAd/${ad._id}`}><button data-tooltip='открыть в новом окне' className='adsList__openAd'></button></NavLink>
										<button className="adsList__btnFavorite"></button>
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
