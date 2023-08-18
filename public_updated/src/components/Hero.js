import React from 'react'
import Banner from '../assets/hero1.png'


const Hero = () => {
    return (
        <div className='bg-black flex justify-center flex-col p-8 py-24'>
            <div className='flex flex-col justify-center'>
                <h1 className='text-white font-bold text-center text-9xl'>Adiamant</h1>
                <img src={Banner} alt='LOGO OF WEBSITE' className='w-96 self-center' />
            </div>
            <h2 className='text-white text-6xl text-center mt-24 font-mono font-bold'>Welcome to the Lesson Creator ! </h2>
            <span className='text-gray-400 text-center text-3xl font-mono mt-8'>3 simple steps</span>
            <div className='my-24 text-white font-serif flex-row justify-evenly w-full text-2xl flex self-center '>
                <p className='bg-white rounded-2xl py-8 w-96 text-black text-center'>
                    Select your Topic
                </p>
                <p className='bg-white rounded-2xl py-8 w-96 text-black text-center'>
                    Wait two minutes
                </p>
                <p className='bg-white rounded-2xl py-8 w-96 text-black text-center'>
                    Get and e-book about your topic
                </p>

            </div>
        </div>
    )
}

export default Hero