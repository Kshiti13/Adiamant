import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [paymentError, setPaymentError] = useState(null);
  const [requiresAction, setRequiresAction] = useState(false);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setPaymentError('Error creating payment method.');
      return;
    }

    try {
      const response = await axios.post('https//adiamant.in/api/payment', {
        amount,
        paymentMethodId: paymentMethod.id,
      });

      if (response.data.requiresAction) {
        setRequiresAction(true);
        // Use response.data.clientSecret to confirm the payment
      } else {
        console.log(response.data.message);
        alert('Payment successful!');
      }
    } catch (error) {
      console.error(error);
      alert('Error processing payment.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Make Payment</h2>
        {requiresAction ? (
          <div>
            <p>Additional action is required to complete the payment.</p>
            {/* Handle further action here */}
          </div>
        ) : (
          <form onSubmit={handlePayment}>
            <input
              type="number"
              placeholder="Enter amount (INR)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="border rounded-md p-4 mb-4">
              <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Pay
            </button>
          </form>
        )}
        {paymentError && <p className="text-red-500 mt-2">{paymentError}</p>}
      </div>
    </div>
  );
};

export default PaymentForm;
