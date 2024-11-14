const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');

// Create a new order
router.post('/', async (req, res) => {
  const { productId, buyerId, address, email, phoneNumber, expectedPrice } = req.body;

  try {
    // Create and save the order
    const order = new Order({
      productId,
      buyerId,
      address,
      email,
      phoneNumber,
      expectedPrice
    });

    await order.save();

    // Update the product status to 'Sold'
    await Product.findByIdAndUpdate(productId, { status: 'Sold' });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(400).json({ error: 'Failed to place order' });
  }
});

module.exports = router;
