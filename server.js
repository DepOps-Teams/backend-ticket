const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/produkRoutes');
const historyRoutes = require("./src/routes/historyRouter")

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

const uri = 'mongodb+srv://kielfrndes2:JwuhIrtUS7FEb1wy@cluster0.tmoy0uj.mongodb.net/tiketWebsite';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB with Mongoose!'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

app.use('/api', userRoutes);
app.use('/produk', productRoutes);
app.use('/produk', historyRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
