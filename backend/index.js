import express from 'express';
import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://saloni:intern%40123@intern-1.kiydkti.mongodb.net/internship_project_1?retryWrites=true&w=majority&appName=Intern-1");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true},
  email: { type: String, required: true },
  role: { type: String, required: true}
});

const User = mongoose.model('User', userSchema);

// User registration
app.post('/register', async (req, res) => {
  const { username, password, name, email, role } = req.body;

  try {
    const user = new User({ username, password, name, email, role });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send('Error registering user:' + error);
  }
});

// User login
app.get('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    // Check the user's role and send different messages
    let message;
    switch (user.role) {
      case 'admin':
        message = 'Welcome, admin!';
        break;
      case 'user':
        message = `Welcome, ${user.name}!`;
        break;
      default:
        message = 'Login successful';
        break;
    }
    res.send(message);
  } catch (error) {
    res.status(500).send('Error logging in: ' + error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
