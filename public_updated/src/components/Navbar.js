import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import LOGO from '../assets/logo.jpg';
import { useState } from 'react';
import PayPal from '../assets/paypal.png';
import Stripe from '../assets/stripe.png';
import Cookies from 'js-cookie';
export const Navbar = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    var modal;

    // When the user clicks the button, open the modal 
    function showModal() {
        modal = document.getElementById("myModal")
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    function closeModal() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    return (
        <div className='bg-yellow-300 p-4 flex flex-row justify-between'>
            <img src={LOGO} alt='LOGO OF WEBSITE' className='w-52' />
            {isLoggedIn ? (
                <>
                    <li className='font-bold font-mono self-center'>
                        <button onClick={showModal}>Take Subscription</button>
                    </li>
                    <li li className='font-bold font-mono self-center hover:cursor-pointer'>
                        <button onClick={() => {
                            Cookies.remove('user-data')
                            navigate('/auth')
                        }}>LOGOUT !!</button></li>
                </>
            ) : (
                <ul className='flex-row flex gap-8'>
                    <li className='font-bold font-mono self-center'>
                        <a href="#what-we-do">What we do ?</a>
                    </li>
                    <li className='font-bold font-mono self-center'>
                        <a href="#unique-features">Our Unique Features</a>
                    </li>
                    <li className='font-bold font-mono self-center'>
                        <a href="#use-cases">Use Cases</a>
                    </li>
                    <li className='font-bold font-mono self-center'>
                        <a href="#pricing">Pricing</a>
                    </li>

                    <li className='font-bold font-mono self-center hover:cursor-pointer'>
                        <button onClick={() => navigate('/auth')}>LOGIN !!</button>
                    </li>
                </ul>
            )
            }


            <div id="myModal" class="modal">
                <span class="close" onClick={closeModal}>&times;</span>

                <div class="modal-content">
                    <ul>
                        <li className="font-bold font-mono self-center">
                            <img src={PayPal} alt="Paypal" className="center" />
                        </li>
                        <li className="font-bold font-mono self-center">
                            <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:border-blue-300"
                                onClick={() => navigate('/paypalPayment')}>
                                Pay By PayPal
                            </button>
                        </li>
                        <li className="font-bold font-mono self-center">
                            <img src={Stripe} alt="Stripe" className="center" />
                        </li>
                        <li className="font-bold font-mono self-center">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                onClick={() => navigate('/stripePayment')}>
                                Pay By Stripe
                            </button>
                        </li>
                    </ul>




                </div>

            </div>
        </div >
    );
};

export default Navbar;
