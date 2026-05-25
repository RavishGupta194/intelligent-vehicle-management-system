require('dotenv').config();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

async function test() {
  const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/authdb';
  console.log('Connecting to', dbURI);
  try {
    await mongoose.connect(dbURI);
    console.log('Connected! Testing query...');
    const result = await User.findOne({ email: 'test@example.com' });
    console.log('Query result:', result);
    process.exit(0);
  } catch (err) {
    console.error('ERROR OCCURRED:');
    console.error(err.name);
    console.error(err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

test();
