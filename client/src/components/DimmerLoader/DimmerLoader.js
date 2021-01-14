import React from 'react'
import { Loader } from 'semantic-ui-react'

export default function DimmerLoader() {

  return (
    <div style={{ textAlign: 'center'}}>
      <Loader active inline='centered' />
    </div>

  )
}
