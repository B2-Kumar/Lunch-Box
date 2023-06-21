import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

function Payment({ totalPrice, onSuccess }) {
  const [product] = useState({
    name: "Your Product Name",
    price: totalPrice,
    description: "Product Description"
  });

  async function handleToken(token, addresses) {
    const response = await axios.post('http://localhost:5000/payment', { token, product });

    console.log(response.status);

    if (response.status === 200) {
      console.log("Payment is successful");
      onSuccess();
    } else {
      console.log("Payment Failed");
    }
  }

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51NJwRvSJu8nZs0KVpJ4t46RLpMLDpAXh2UPsHtGKBfhB970AySuo8MZLixHhT64fOW39k2HkoKLnTmHy8Z9CqWvv0074khVqaQ"
        token={handleToken}
        name="Buy Product"
        amount={product.price * 100}
        billingAddress
        shippingAddress
      >
        <button className='btn text-white'>Confirm Order and Pay ₹{product.price} </button>
      </StripeCheckout>
    </div>
  );
}

export default Payment;
