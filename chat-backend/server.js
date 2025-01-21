const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());  


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Krati@0909',  
    database: 'chat_app_db'     
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});


app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});


app.get('/messages', (req, res) => {
    db.query('SELECT * FROM messages ORDER BY timestamp DESC', (err, results) => {
        if (err) {
            res.status(500).send('Error fetching messages');
        } else {
            res.json(results);
        }
    });
});



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


const port = 5000;
app.listen(5000, () => console.log("Server is running on port 5000"));

    
