import React from 'react'

const sectionTitle = ({title}) => {
   
  return (
    <div className='flex gap-10 items-center py-10 sm:w-full'>
        <h1 className='text-secondary text-3xl font-semibold sm:text-2xl'>{title}</h1>
        <div className='w-60 h-[2px] bg-blue-300 sm:w-12 '>
        </div>
    </div>
  )
}

export default sectionTitle