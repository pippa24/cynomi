const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test_data'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected');
});

// Create table if not exists
const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  gender VARCHAR(255),
  sleep_time_duration INT,
  date DATE
)`;

db.query(createTableQuery, (err, result) => {
    if (err) {
        throw err;
    }
    console.log('Table created or already exists');
});

// POST route to add user
app.post('/api/addUser', (req, res) => {
    const { name, gender, sleepTimeDuration } = req.body;
    const date = new Date().toISOString().slice(0, 10);

    const addUserQuery = `INSERT INTO users (name, gender, sleep_time_duration, date) VALUES (?, ?, ?, ?)`;
    db.query(addUserQuery, [name, gender, sleepTimeDuration, date], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error adding user to database' });
        } else {
            res.status(200).send({ message: 'User added successfully' });
        }
    });
});

// GET route to fetch user data
app.get('/api/users', (req, res) => {
    const getUsersQuery = `SELECT name, gender, COUNT(*) AS count FROM users GROUP BY name, gender`;
    db.query(getUsersQuery, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching user data' });
        } else {
            res.status(200).send(result);
        }
    });
});


app.get('/api/sleepTimeData/:userName', (req, res) => {
    const userName = req.params.userName;
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const getSleepTimeDataQuery = `
    SELECT date, sleep_time_duration
    FROM users
    WHERE name = ? AND date >= ?
    ORDER BY date DESC
    LIMIT 7
  `;

    db.query(getSleepTimeDataQuery, [userName, sevenDaysAgo], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching sleep time data' });
        } else {
            res.status(200).send(result);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
