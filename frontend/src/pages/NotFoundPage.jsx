import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='min-h-screen bg-cover text-white   bg-center flex flex-col justify-center items-center'
    style={{backgroundImage:`url("/404.png")`}}
    >
    <header className=' absolute top-0 left-0 p-4'>
        <Link to={"/"}>
        <img src='/netflix-logo.png' className='w-24 md:w-32' alt='Logo'/>
        </Link>
    </header>
    <main className='text-center z-10'>
        <h1 className='text-3xl mb-4 md:text-5xl'>Lost your Way ?</h1>
        <p className='mb-6 text-lg md:text-xl'>Sorry we can't find that page.You'll finds lots to explore on the home page</p>
        <Link to={"/"} className='bg-white text-black px-4 py-2 rounded'>
        Netflix Home
        </Link>
    </main>

    </div>
  )
}

export default NotFoundPage