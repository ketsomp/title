const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 5069;

app.use(cors());
app.use(express.json());

// Path for storing users' binary data
const usersFilePath = '/Users/aniketsompura/Documents/Github/title/Server/users.bin';

// Check if the file exists, and if not, create it
if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, Buffer.from([]));  // Write an empty buffer
}

// Read users from the binary file
function readUsersFromBinary() {
    try {
        const buffer = fs.readFileSync(usersFilePath);
        return JSON.parse(buffer.toString());
    } catch (err) {
        console.error('Error reading users:', err);
        return [];  // Return an empty array if reading fails
    }
}

// Save users to the binary file
function saveUsersToBinary(users) {
    try {
        fs.writeFileSync(usersFilePath, Buffer.from(JSON.stringify(users)));
    } catch (err) {
        console.error('Error saving users:', err);
    }
}

// Register route
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    let users = readUsersFromBinary();

    // Check if the user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json("User already exists!");
    }

    // Add the new user
    const newUser = { email, password };
    users.push(newUser);

    // Save updated users to the binary file
    saveUsersToBinary(users);

    return res.status(200).json({ message: 'Registration successful!' });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    let users = readUsersFromBinary();

    // Find the user by email
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(400).json({ message: 'User not found!' });
    }

    // Check if the password matches
    if (user.password !== password) {
        return res.status(400).json({ message: 'Incorrect password!' });
    }

    return res.status(200).json({ message: 'Login successful!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
