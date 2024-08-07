require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
})
.then(() =>console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const tipSchema = new mongoose.Schema({
    date: Date,
    amount: Number,
    percentage: Number,
    notes: String
});

const Tip = mongoose.model('Tip', tipSchema);

app.post('/api/tips', (req, res) => {
    console.log('Received POST request with data:', req.body);

    const newTip = new Tip({
        date: req.body.date,
        amount: req.body.amount,
        percentage: req.body.percentage,
        notes: req.body.notes,
    });

    newTip.save()
        .then(tip => {
            console.log('Tip saved:', tip);
            res.status(201).json(tip);
        })
        .catch(err => {
            console.error('Error saving tip:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.get('/api/tips', (req, res) => {
    console.log('Received GET request for tips');

    Tip.find()
        .then(tips => {
            console.log('Tips retrieved:', tips);
            res.json(tips);
        })
        .catch(err => {
            console.error('Error retrieving tips:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});