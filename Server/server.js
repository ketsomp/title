const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 5069;

app.use(cors());
app.use(express.json());

const usersFilePath = 'users.bin';

if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, Buffer.from([]));  
}

function readUsersFromBinary() {
    try {
        const buffer = fs.readFileSync(usersFilePath);
        return JSON.parse(buffer.toString());
    } catch (err) {
        console.error('Error reading users:', err);
        return [];  
    }
}

function saveUsersToBinary(users) {
    try {
        fs.writeFileSync(usersFilePath, Buffer.from(JSON.stringify(users)));
    } catch (err) {
        console.error('Error saving users:', err);
    }
}

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    let users = readUsersFromBinary();

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json("User already exists!");
    }

    const newUser = { email, password };
    users.push(newUser);

    saveUsersToBinary(users);

    return res.status(200).json({ message: 'Registration successful!' });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    let users = readUsersFromBinary();

    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(400).json({ message: 'User not found!' });
    }

    if (user.password !== password) {
        return res.status(400).json({ message: 'Incorrect password!' });
    }

    return res.status(200).json({ message: 'Login successful!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
