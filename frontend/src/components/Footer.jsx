import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='w-full h-[1px] bg-gray-800'/>
    <div className='bg-black py-10  text-white'>
      
        <div className='mx-auto px-4 container'>
          <div className=' text-[12px] text-center md:text-[18px]'>
            <p>Build by <a className='text-red-600 hover:underline hover:text-red-700' href='https://github.com/manikandan-ak0812/netflix-mern'>Github</a> .</p>
          </div>
        </div>
    </div>
    </>
  )
}

export default Footer