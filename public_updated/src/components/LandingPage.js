import React from 'react'
import { Navbar } from './Navbar'
import Hero from './Hero'
import Introduction from './Introduction'
import Empowering from './Empowering'
import UseCases from './UseCases'
import Pricing from './Pricing'
import { useLocation } from 'react-router-dom'
import Dashboard from './Dashboard'
import Cookies from 'js-cookie'
import Footer from './Footer'

const LandingPage = () => {
    const savedUsername = (Cookies.get('user-data'));
    let isLoggedIn = savedUsername !== !undefined
    let data = savedUsername !== undefined && JSON.parse(savedUsername)
    return (
        <section>
            {
                savedUsername !== undefined ? <><Navbar isLoggedIn={isLoggedIn} /> <Dashboard data={data} /><Footer /></>  : <><Navbar />
                    <Hero />
                    <Introduction />
                    <Empowering />
                    <UseCases />
                    <Pricing /></>
            }

        </section>
    )
}

export default LandingPage