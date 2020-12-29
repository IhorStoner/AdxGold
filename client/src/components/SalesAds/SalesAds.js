import React from 'react'
import { Grid } from 'semantic-ui-react'
import './SalesAds.scss'
import { Link } from 'react-router-dom'

export default function SalesAds({salesArr}) {
  return (
    <Grid className='sales-ads' >
      {
        salesArr.map((ad,i)=> (
          <Grid.Column key={i} className='sales-ads__item'>
            <Link to={`/detailsAd/${ad._id}`}>{ad.title} {ad.type} {ad.productPrice}$</Link>
          </Grid.Column>
        ))
      }
    </Grid>
  )
}
