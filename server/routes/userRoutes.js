const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Product = require('../models/product'); // Adjust the path as necessary
const Order = require('../models/order'); // Adjust the path as necessary

// Registration Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
  
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.status(200).json({ token, username: user.username,userId: user._id.toString() }); // Ensure username is included
    } catch (error) {
      res.status(500).json({ message: 'Server error.' });
    }
  });
  
  // Route to get user's products based on their status
router.get('/details/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch products the user is selling
    const sellingProducts = await Product.find({ sellerId: userId, status: 'Selling' }).populate('sellerId');

    // Fetch orders where the user is the buyer and populate related fields
    const boughtOrders = await Order.find({ buyerId: userId })
      .populate({
        path: 'productId',
        populate: { path: 'sellerId', model: 'User' } // Populate the seller of the product
      })
      .populate('buyerId');

    // Fetch orders where the user is the seller and populate related fields
    const soldOrders = await Order.find({ productId: { $in: await Product.find({ sellerId: userId }).distinct('_id') } })
      .populate({
        path: 'productId',
        populate: { path: 'sellerId', model: 'User' } // Populate the seller of the product
      })
      .populate('buyerId');

    // Prepare sold products data
    const soldProducts = soldOrders.map(order => ({
      ...order.productId._doc,
      price: order.expectedPrice,
      buyerName: order.buyerId ? order.buyerId.username : 'Unknown',
      buyerPhoneNumber: order.phoneNumber,
      buyerEmail: order.email,
    }));

    // Prepare bought products data
    const boughtProducts = boughtOrders.map(order => ({
      ...order.productId._doc,
      price: order.expectedPrice,
      sellerName: order.productId.sellerId ? order.productId.sellerId.username : 'Unknown',
    }));

    res.status(200).json({
      sellingProducts,
      boughtProducts,
      soldProducts
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Error fetching user details' });
  }
});

module.exports = router;