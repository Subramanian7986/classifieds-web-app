const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Order = require('../models/order');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Ensure the uploads directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route to fetch products based on status
router.get('/:status', async (req, res) => {
  try {
    const products = await Product.find({ status: req.params.status });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Route to handle product submission (selling a product)
router.post('/sell', upload.single('productImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!req.body.productName || !req.body.price || !req.body.productDescription || !req.body.sellerId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product({
      name: req.body.productName,
      image: req.file.filename,
      price: req.body.price,
      description: req.body.productDescription,
      status: 'Selling',
      sellerId: req.body.sellerId
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Route to handle product purchase
router.post('/purchase', async (req, res) => {
  try {
    if (!req.body.productId || !req.body.userId) {
      return res.status(400).json({ message: 'Product ID and User ID are required' });
    }

    const product = await Product.findById(req.body.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.status === 'Sold') {
      return res.status(400).json({ message: 'Product already sold' });
    }

    if (product.sellerId.toString() === req.body.userId) {
      return res.status(400).json({ message: 'You cannot buy your own product.' });
    }

    product.status = 'Sold';
    product.buyerId = req.body.userId;

    await product.save();

    const newOrder = new Order({
      productId: req.body.productId,
      buyerId: req.body.userId,
      address: req.body.address,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      expectedPrice: req.body.expectedPrice,
      status: 'pending'
    });

    await newOrder.save();

    res.status(200).json({ message: 'Product purchased successfully', product, order: newOrder });
  } catch (error) {
    console.error('Error buying product:', error);
    res.status(500).json({ message: 'Error buying product' });
  }
});

module.exports = router;
