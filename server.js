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

}));

app.use(bodyParser.json());

const uri = 'mongodb+srv://websitetiket:minikube123@cluster0.hgg3m54.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB with Mongoose!'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

app.use('/api', userRoutes);
app.use('/produk', productRoutes);
app.use('/produk', historyRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Selamat Datang di API Tiket Website');
}
);