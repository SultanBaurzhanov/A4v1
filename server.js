const express = require('express');
const bodyParser = require('body-parser'); // Require body-parser
const path = require('path');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const app = express();

const PORT = process.env.PORT || 3000;

//body-parser middleware to parse json and urlencoded form data I HATE IT I DIDNT INCLDUE IT FUCK MOTHERFUCKER GODDAMNIT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use(express.static('public')); //public folder

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Sultan:qwerty1234@cluster0.ft5nfe7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();
