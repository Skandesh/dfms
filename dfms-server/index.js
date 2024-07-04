const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const authRouters = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');
require('dotenv').config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log('MongoDB connection error: ', err));

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/auth', authRouters);
app.use('/files', fileRoutes);

app.use(errorHandler);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server running' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
