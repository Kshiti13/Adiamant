import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = () => {

    return (
        <div style={{textAlign: 'center'}}>
            <h2 className="font-bold font-mono self-center">Pay Using PayPal</h2>
        <PayPalScriptProvider options={{ clientId: "AUL6RvnVpDnkOEpIjyYPlxGurPv-hL-mVusvzhF0fOXgHdzw5P2iNB81Mpoh5bCqIChNOONGIeNYWcL2" }}>
            <PayPalButtons style={{ layout: "vertical" }} />
        </PayPalScriptProvider>
        </div>
    );

}

export default PayPalPayment;