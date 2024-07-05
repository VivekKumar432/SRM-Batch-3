import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect("mongodb+srv://saloni:intern%40123@intern-1.kiydkti.mongodb.net/?retryWrites=true&w=majority&appName=Intern-1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// User registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }
    res.send('Login successful');
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
