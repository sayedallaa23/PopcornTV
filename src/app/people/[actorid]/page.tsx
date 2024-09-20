import React from 'react'

type Props = {params:any}

function page({params}: Props) {
  return (
    <div className='text-white'>{params.actorid}</div>
  )
}

export default page