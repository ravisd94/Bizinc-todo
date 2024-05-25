// Importing required modules
const express = require('express'); // Importing express module
const router = express.Router(); // Creating router instance
const dataController = require('../controllers/dataController'); // Importing data controller

// Route to fetch all data
router.get('/', async (req, res) => {
  try {
    // Fetching all data
    const data = await dataController.getData();
    // Sending data as JSON response
    res.json(data);
  } catch (error) {
    // Handling errors during data retrieval
    if (error.message.startsWith('Validation errors:')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
});

// Route to fetch data by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Fetching data by ID
    const data = await dataController.getDataById(id);
    // If data not found, return 404 error
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }
    // Sending data as JSON response
    res.json(data);
  } catch (error) {
    // Handling errors during data retrieval
    if (error.message.startsWith('Validation errors:')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
});

// Exporting router for use in other modules
module.exports = router;
