require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index.js');
const cors = require("cors")

const mongoString = process.env.DATABASE_URL;
const app = express();

const allowedOrigins = ["http://localhost:5173/"]

app.use(cors({
    origin: (origin, callback) => {
        if(!origin) return callback(null, true)
        if(allowedOrigins.indexOf(origin) === 1){
            const msg = 'The CORS policy for this site does not allow access from the specified origin'
            return callback(new Error(msg), false)
        }
        return callback(null,true)
    }
}))

app.use(express.json());
app.use('/api', routes);

mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const database = mongoose.connection;
database.on('error', (err) => console.log('Database error:', err));
database.once('connected', () => console.log('Database Connected!'));

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});