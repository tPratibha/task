const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Schema and Model
const transactionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  dateOfSale: Date,
  category: String,
  sold: Boolean,
});
const Transaction = mongoose.model('Transaction', transactionSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern_stack_challenge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialize Database API
app.get('/initialize-db', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    await Transaction.deleteMany({});
    await Transaction.insertMany(transactions);

    res.status(200).send('Database initialized successfully');
  } catch (error) {
    res.status(500).send('Error initializing database');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
