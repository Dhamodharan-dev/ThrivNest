// Import necessary modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer'); // Import multer for handling file uploads
const path = require('path'); // Import path module
const authRoutes = require('./routes/authRoutes.js');
require('dotenv').config();

// Import property model
const Property = require('./models/property.js');

// Create Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images statically

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Specify destination folder for storing uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename uploaded image files with timestamp prefix
  }
});

const upload = multer({ storage: storage });

// Routes
app.use('/api', authRoutes);

// Route for creating a new property with image upload
app.post('/api/property', upload.single('image'), async (req, res) => {
  try {
    // Extract property data from request body
    const { type, price, address, owner, contact, username } = req.body;

    // Create new property object
    const newProperty = new Property({
      type,
      price,
      address,
      owner,
      contact,
      username,
      image: req.file.path // Store path of the uploaded image in the database
    });

    // Save the new property to the database
    await newProperty.save();

    // Respond with success message
    res.status(201).json({ message: 'Property created successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error creating property:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for updating a property
app.put('/api/property/:id', upload.single('image'), async (req, res) => {
  try {
    const { type, price, address, owner, contact, username } = req.body;
    const propertyId = req.params.id;

    // Find the property by ID
    const property = await Property.findById(propertyId);

    // If property not found, return error
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Update property fields
    property.type = type;
    property.price = price;
    property.address = address;
    property.owner = owner;
    property.contact = contact;
    property.username = username;

    // Update image only if a new image is uploaded
    if (req.file) {
      property.image = req.file.path;
    }

    // Save the updated property
    await property.save();

    // Respond with success message
    res.status(200).json({ message: 'Property updated successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route for fetching properties
app.get('/api/property', async (req, res) => {
  try {
    // Query the database to retrieve properties
    const properties = await Property.find();
    res.status(200).json(properties); // Send properties as JSON response
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for deleting a property
app.delete('/api/property/:id', async (req, res) => {
  try {
    const propertyId = req.params.id;

    // Find the property by ID and delete it
    const deletedProperty = await Property.findByIdAndDelete(propertyId);

    // If property not found, return error
    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
