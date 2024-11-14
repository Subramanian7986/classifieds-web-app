const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['Available', 'Selling', 'Sold'], default: 'Available' },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // To track the buyer
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // To track the seller
});

// Export the Product model
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
