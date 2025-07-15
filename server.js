const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// ✅ MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rao@123',
  database: 'purple_clone'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL as ID ' + db.threadId);
});

// ✅ Middleware
app.use(express.static(path.join(__dirname))); // Serve static files (HTML, CSS, JS)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Routes to serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// ✅ Signup route
app.post('/signup', (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send('❌ Passwords do not match.');
  }

  const checkQuery = 'SELECT * FROM signup WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).send('❌ Database error.');
    if (results.length > 0) {
      return res.status(400).send('❌ User already exists.');
    }

    const insertQuery = 'INSERT INTO signup (fullName, email, password, confirmPassword) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [fullName, email, password, confirmPassword], (err) => {
      if (err) return res.status(500).send('❌ Signup failed.');
      console.log(`✅ New user stored: ${email}`);
      res.redirect('/login'); // ✅ Redirect to login page after signup
    });
  });
});

// ✅ Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM signup WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).send('❌ Database error.');
    if (results.length > 0) {
      console.log(`🔓 Login successful for: ${email}`);
      res.send('✅ Login successful! Welcome to Purple Clone.');
    } else {
      res.status(401).send('❌ Invalid email or password.');
    }
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
