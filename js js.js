const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/login_signup_app', { useNewUrlParser: true, useUnifiedTopology: true });

const nameField = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const name = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password,
  });
  user.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error during signup');
    } else {
      res.send('Signup successful');
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email, password }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error during login');
    } else if (user) {
      res.send('Login successful');
    } else {
      res.status(401).send('Invalid email or password');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
const mongoose = require('mongoose');

// ... (other imports and code)

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/login_signup_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and create a model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// ... (rest of your code)
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password,
    });
  
    user.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error during signup');
      } else {
        res.send('Signup successful');
      }
    });
  });
  
