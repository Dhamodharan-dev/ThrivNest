// Import necessary modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
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

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
app.use('/api', authRoutes);

// Route for handling requests to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

// Route for creating a new property
app.post('/api/property', async (req, res) => {
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
      username
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
