const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./db');

const app = express();
connectDB();
app.use(cors());

app.use(express.json());

// Use authentication routes
app.use('/auth', authRoutes);

// Use API routes
app.use('/api', apiRoutes);

// ... listen and start the server ...
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});