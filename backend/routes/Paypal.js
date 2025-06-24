const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/VerifyToken');
const { createPayPalOrder, capturePayPalPayment } = require('../utils/PaypalService');

// creare Paypal order
router.post('/paypal/create-order', verifyToken, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const order = await createPayPalOrder(items, totalAmount);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error in create PayPal order route:', error);
    res.status(500).json({ error: 'Failed to create PayPal order' });
  }
});

// inregistrare si acceptare plata
router.post('/paypal/capture-payment', verifyToken, async (req, res) => {
  try {
    const { orderId } = req.body;
    const captureData = await capturePayPalPayment(orderId);
    res.status(200).json(captureData);
  } catch (error) {
    console.error('Error in capture PayPal payment route:', error);
    res.status(500).json({ error: 'Failed to capture PayPal payment' });
  }
});

module.exports = router;