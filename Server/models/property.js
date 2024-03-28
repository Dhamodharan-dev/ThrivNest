const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  type: String,
  price: Number,
  address: String,
  owner: String,
  contact: Number,
  username: String,
  image: String // Add image field to the schema
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
