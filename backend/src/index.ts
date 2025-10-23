import express from 'express';

import mongoose from 'mongoose';
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/stocktrack' )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});