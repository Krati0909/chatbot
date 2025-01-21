const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());  // Allows requests from React frontend

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Krati@0909',  // Use your MySQL password here
    database: 'chat_app_db'     // Use the database name you created earlier
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Root route (for debugging)
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// API to get all messages
app.get('/messages', (req, res) => {
    db.query('SELECT * FROM messages ORDER BY timestamp DESC', (err, results) => {
        if (err) {
            res.status(500).send('Error fetching messages');
        } else {
            res.json(results);
        }
    });
});


// API to send a new message
app.post('/send', (req, res) => {
    const { username, message } = req.body;
    db.query('INSERT INTO messages (username, message) VALUES (?, ?)', [username, message], (err, results) => {
        if (err) {
            res.status(500).send('Error sending message');
        } else {
            res.status(200).send('Message sent');
        }
    });
});

// Start the server
const port = 5000;
app.listen(5000, () => console.log("Server is running on port 5000"));

    
