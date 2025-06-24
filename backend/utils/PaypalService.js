const axios = require('axios');
require('dotenv').config();

// preluare token acces Paypal
const getPayPalAccessToken = async () => {
  try {
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`
    ).toString('base64');

    const response = await axios({
      method: 'post',
      url: `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${auth}`
      },
      data: 'grant_type=client_credentials'
    });
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error);
    throw error;
  }
};

// creare order Paypal
const createPayPalOrder = async (items, totalAmount) => {
  const accessToken = await getPayPalAccessToken();
  
  try {
    const response = await axios({
      method: 'post',
      url: `${process.env.PAYPAL_API_URL}/v2/checkout/orders`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      data: {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: totalAmount,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: totalAmount
                }
              }
            },
            items: items.map(item => ({
              name: item.name,
              quantity: item.quantity,
              unit_amount: {
                currency_code: 'USD',
                value: (item.price / item.quantity).toFixed(2)
              }
            }))
          }
        ]
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    throw error;
  }
};

// Inregistrare plata Paypal
const capturePayPalPayment = async (orderId) => {
  const accessToken = await getPayPalAccessToken();
  
  try {
    const response = await axios({
      method: 'post',
      url: `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    throw error;
  }
};

module.exports = {
  createPayPalOrder,
  capturePayPalPayment
};