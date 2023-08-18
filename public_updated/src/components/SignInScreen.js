import React, { useEffect, useState } from 'react';
import SignIn from '../components/SignIn';

import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';

const SignInScreen = () => {
    const [data, setData] = useState()
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()
    const handleSignIn = async (e, email, password) => {

        e.preventDefault();
        if (!email.includes('@')) {
            setErrorMessage('Email must contain "@"');
            return;
        }
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        if (!password.match(passwordRegex)) {
          setErrorMessage('Password must be at least 8 characters and contain at least 1 number, 1 lowercase letter, 1 uppercase letter, and 1 special symbol');
          return;
        }

        try {
            const response = await fetch('http://localhost:30050/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                setData(data)
                Cookies.set('user-data', JSON.stringify({ data }), { expires: 7 });
                console.log('Sign-in successful:', data);
            } else {
                console.log('Sign-in failed');
            }
            setErrorMessage('');
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        if (data !== undefined) {
            navigate("/", { state: { token: data.token, user: data.user } })
        }
    }, [data])


    return (
        <div>
            <SignIn errorMessage={errorMessage} handleSignIn={handleSignIn} />
        </div>
    );
};

export default SignInScreen;
