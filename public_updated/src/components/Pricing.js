import React from 'react';

const Pricing = () => {
  return (
    <div id="pricing" className='bg-black p-8'>
      <h2 className='text-6xl text-white text-center my-12 font-mono font-bold animate-fadeIn'>Pricing</h2>
      <div className='flex justify-center items-center p-4 grid-cols-2 gap-8 text-justify font-mono leading-6 mx-48'>
        <div className='bg-white rounded-xl p-4 text-justify transform hover:rotate-6 transition duration-300 ease-in-out hover:shadow-2xl'>
          <p className='text-center text-2xl my-4 font-bold'>FREE - 0 INR</p>
          <p className='text-justify '>2 tokens</p>
        </div>
        <div className='bg-white rounded-xl p-4 text-justify transform hover:rotate-6 transition duration-300 ease-in-out hover:shadow-2xl'>
          <p className='text-center text-2xl my-4 font-bold'>PAID - 500 INR</p>
          <p className='text-justify '>unlimited tokens per month</p>
        </div>
      </div>
    </div>
  )
}

export default Pricing;
