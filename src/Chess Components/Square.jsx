import React from 'react'

export default function Square({piece, ...props}) {
  return (
    <div className='square'>
      {piece}
    </div>
  )
}
