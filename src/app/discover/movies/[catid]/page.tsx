import React from 'react'

type Props = {
    params:any
}

function page({params}: Props) {
  return (
    <div className='text-white'>{params.catid}</div>
  )
}

export default page