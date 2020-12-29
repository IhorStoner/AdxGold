import React from 'react'
import { Grid } from 'semantic-ui-react'
import './RecommendedAds.scss'
import { Link } from 'react-router-dom'

export default function RecommendedAds({ recommendedAds }) {
  return (
    <Grid className='sales-ads' >
      {
        recommendedAds.map((ad, i) => (
          <Grid.Column key={i} className='sales-ads__item'>
            <Link to={`/detailsAd/${ad._id}`}>{ad.title} {ad.type} {ad.productPrice}$</Link>
          </Grid.Column>
        ))
      }
    </Grid>
  )
}
