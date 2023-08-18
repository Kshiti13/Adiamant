import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-yellow-300 p-4 flex flex-row justify-between'>
            <ul>
            <li onClick={() => navigate('/contactUs')} style={{cursor: 'pointer'}}>Contact Us</li>
            <li onClick={() => navigate('/tos')} style={{cursor: 'pointer'}}>Terms And Conditions</li>
            <li onClick={() => navigate('/privacyPolicy')} style={{cursor: 'pointer'}}>Privacy Policy</li>
            <li onClick={() => navigate('/refundPolicy')} style={{cursor: 'pointer'}}>Refund Policy</li>
            <li onClick={() => navigate('/faq')} style={{cursor: 'pointer'}}>FAQs</li>
            </ul>
            </div>
    );
}

export default Footer;