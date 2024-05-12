const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Darsi-Book-bazar', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Define a mongoose schema for the user
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

// Create a mongoose model for the users collection
const User = mongoose.model('users', userSchema);

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'sufyanbinimran@gmail.com',
    pass: 'ixdt bhcw tose lgeh' // Replace with your actual email password
  }
});

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for handling sign up form submission
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user instance
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword
  });

  // Save the user to the database
  newUser.save()
    .then(() => {
      console.log('User saved successfully');
      res.status(201).send('User saved successfully');
    })
    .catch(err => {
      console.error('Error saving user:', err);
      res.status(500).send('Error saving user');
    });
});

// Route for handling login requests
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // User not found
      return res.status(404).send('User not found');
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // Password doesn't match
      return res.status(401).send('Invalid password');
    }

    // Authentication successful
    // Send email to the user
    const mailOptions = {
      from: 'sufyanbinimran@gmail.com',
      to: email,
      subject: 'Login Notification',
      text: 'You have successfully logged in to your account.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Login successful. Email sent.');
      }
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Internal server error');
  }
});
////////////////////////////////////////////////////////
// Route for handling subscription requests
app.post('/subscribe', async (req, res) => {
    const { email } = req.body;
  
    try {
      // Create email subscription record in the database if needed
      // For simplicity, you can assume it's already implemented
  
      // Send email to the user
      const mailOptions = {
        from: 'sufyanbinimran@gmail.com',
        to: email,
        subject: 'Subscription Confirmation',
        text: 'Thank you for subscribing to our newsletter! Stay tuned for the latest arrivals and updates.'
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Error sending email');
        } else {
          console.log('Email sent:', info.response);
          res.status(200).send('Subscription successful. Email sent.');
        }
      });
    } catch (err) {
      console.error('Error during subscription:', err);
      res.status(500).send('Internal server error');
    }
  });
  
 // Define mongoose schema and model
const bookSchema = new mongoose.Schema({
    name: String,
  });
  
  const Book = mongoose.model('kitaaben', bookSchema);
  
  // GET method for /search
  app.get('/search', async (req, res) => {
    const searchInput = req.query.searchInput;
  
    try {
      const searchResults = await Book.find({ title: { $regex: searchInput, $options: 'i' } });
      res.json(searchResults);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
  
// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
