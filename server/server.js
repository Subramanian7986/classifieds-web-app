const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); // Import path

const app = express();

// Serve uploads from the public/uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); 
// Use CORS and body-parser middleware
app.use(cors());
app.use(bodyParser.json());
mongoose.set('strictQuery', false);
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/classifieds', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import route modules
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orders'); 

// Define routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
