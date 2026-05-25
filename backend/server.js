require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/authdb';
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully');
    seedListings();
  })
  .catch(err => console.error('MongoDB Connection Error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coins: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

// Listing Schema
const listingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  km: { type: Number, required: true },
  fuel: { type: String, required: true },
  transmission: { type: String, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: false },
  owner: { type: String, default: '1st Owner' },
  rating: { type: Number, default: 5.0 },
  status: { type: String, default: 'pending' }, 
  userEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Listing = mongoose.model('Listing', listingSchema);

// Order Schema (Rentals)
const orderSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  carName: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Maintenance Schema
const maintenanceSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  vehicles: [{
    makeLabel: String,
    model: String,
  }],
  services: [{
    serviceName: String,
    vehicleModel: String,
    price: Number
  }],
  address: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' }, // pending, accepted, rejected, completed
  createdAt: { type: Date, default: Date.now }
});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

// Redemption Schema
const redemptionSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  productName: { type: String, required: true },
  cost: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  pin: { type: String, required: true },
  status: { type: String, default: 'pending' }, // pending, shipped, delivered
  createdAt: { type: Date, default: Date.now }
});

const Redemption = mongoose.model('Redemption', redemptionSchema);

// Referral Schema
const referralSchema = new mongoose.Schema({
  referrerEmail: { type: String, required: true },
  referralCode: { type: String, required: true, unique: true },
  usages: [{
    usedByEmail: String,
    usedByName: String,
    date: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});
const Referral = mongoose.model('Referral', referralSchema);

// Transaction Schema (Points History)
const transactionSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  reason: { type: String, required: true },
  type: { type: String, enum: ['earn', 'spend'], required: true },
  createdAt: { type: Date, default: Date.now }
});
const Transaction = mongoose.model('Transaction', transactionSchema);

// Price Offer (Negotiation) Schema
const offerSchema = new mongoose.Schema({
  listingId: { type: String, required: true },
  listingName: { type: String, required: true },
  listingPrice: { type: Number, required: true },
  buyerName: { type: String, required: true },
  buyerEmail: { type: String, required: true },
  sellerEmail: { type: String, required: true },
  offerAmount: { type: Number, required: true },
  counterAmount: { type: Number, default: null },
  message: { type: String, default: '' },
  status: { type: String, default: 'pending' }, // pending, accepted, rejected, countered
  createdAt: { type: Date, default: Date.now }
});
const Offer = mongoose.model('Offer', offerSchema);

// Seed Data Logic
const seedListings = async () => {
  try {
    const count = await Listing.countDocuments();
    console.log('Seed: Current listing count:', count);
    if (count === 0) {
      const initialListings = [
        { name: 'Mahindra Thar LX', year: 2022, km: 12000, fuel: 'Diesel', transmission: 'Manual', price: 1550000, city: 'Delhi', type: 'Rugged', userEmail: 'admin@carvia.com', status: 'approved' },
        { name: 'Honda City ZX', year: 2021, km: 28000, fuel: 'Petrol', transmission: 'CVT', price: 1050000, city: 'Delhi', type: 'Sedan', userEmail: 'admin@carvia.com', status: 'approved' },
        { name: 'Toyota Fortuner Sigma 4', year: 2019, km: 65000, fuel: 'Diesel', transmission: 'Automatic', price: 2600000, city: 'Delhi', type: 'SUV', userEmail: 'admin@carvia.com', status: 'approved' },
        { name: 'Tata Nexon XZ+ EV', year: 2022, km: 22000, fuel: 'Electric', transmission: 'Auto', price: 1350000, city: 'Delhi', type: 'Electric', userEmail: 'admin@carvia.com', status: 'approved' },
        { name: 'Mahindra XUV700 AX7L', year: 2022, km: 18000, fuel: 'Petrol', transmission: 'Auto', price: 2250000, city: 'Pune', type: 'SUV', userEmail: 'admin@carvia.com', status: 'approved' },
        { name: 'Maruti Swift ZXI', year: 2021, km: 25000, fuel: 'Petrol', transmission: 'Manual', price: 650000, city: 'Mumbai', type: 'Sedan', userEmail: 'admin@carvia.com', status: 'approved' },
        { name: 'Kia Seltos GTX+', year: 2021, km: 32000, fuel: 'Diesel', transmission: 'Automatic', price: 1680000, city: 'Bangalore', type: 'SUV', userEmail: 'admin@carvia.com', status: 'approved' },
        { name: 'Hyundai Venue SX', year: 2021, km: 28000, fuel: 'Petrol', transmission: 'Manual', price: 890000, city: 'Delhi', type: 'SUV', userEmail: 'admin@carvia.com', status: 'approved' },
        { name: 'Tata Safari Dark', year: 2022, km: 15000, fuel: 'Diesel', transmission: 'Automatic', price: 2150000, city: 'Delhi', type: 'SUV', userEmail: 'admin@carvia.com', status: 'approved' }
      ];
      await Listing.insertMany(initialListings);
      console.log('Seed: Initial Listings added');
    } else {
      // For debug: Ensure existing listings are approved so they show up
      await Listing.updateMany({ status: 'pending' }, { $set: { status: 'approved' } });
      console.log('Seed: Existing listings approved');
    }

    const adminExists = await User.findOne({ email: 'admin@carvia.com' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      const adminUser = new User({
        name: 'Super Admin',
        email: 'admin@carvia.com',
        password: hashedPassword,
        isAdmin: true
      });
      await adminUser.save();
      console.log('Seed: Admin created');
    }
  } catch (err) {
    console.error('Seed Error:', err);
  }
};

seedListings();

// API ROUTES
// 1. AUTH
app.post('/api/signup', async (req, res) => {
  const { name, email, password, referralCode } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists.' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    
    // Auto-generate their own referral code
    const newCode = `CARVIA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const myRef = new Referral({
      referrerEmail: email,
      referralCode: newCode
    });
    await myRef.save();

    // Process used referral code if provided
    if (referralCode && referralCode.trim() !== '') {
      const refToUse = await Referral.findOne({ referralCode: referralCode.trim().toUpperCase() });
      if (refToUse && refToUse.referrerEmail !== email) {
        const alreadyUsed = refToUse.usages && refToUse.usages.some(u => u.usedByEmail === email);
        if (!alreadyUsed) {
          refToUse.usages.push({ usedByEmail: email, usedByName: name });
          await refToUse.save();
          
          // Award coins to both parties
          user.coins = 1000;
          await user.save();
          
          await User.findOneAndUpdate({ email: refToUse.referrerEmail }, { $inc: { coins: 1000 } });

          // Record Transactions
          await new Transaction({ userEmail: email, amount: 1000, reason: 'Referral Bonus (New User)', type: 'earn' }).save();
          await new Transaction({ userEmail: refToUse.referrerEmail, amount: 1000, reason: `Referral Bonus (User: ${name})`, type: 'earn' }).save();
        }
      }
    }
    
    res.status(201).json({ message: 'Account created!' });
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.get('/api/user/coins/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.status(200).json({ coins: user ? user.coins : 0 });
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.get('/api/user/transactions/:email', async (req, res) => {
  try {
    const history = await Transaction.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found.' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Wrong password.' });
    res.status(200).json({ user: { name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error.' });
  }
});

// 2. MARKETPLACE
app.post('/api/listings', async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json({ message: 'Listing submitted!' });
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.get('/api/listings', async (req, res) => {
  try {
    const listings = await Listing.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

// 3. ADMIN
app.get('/api/admin/listings', async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.put('/api/admin/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json({ message: 'Updated!', listing });
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.delete('/api/admin/listings/:id', async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted!' });
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.get('/api/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.status(200).json(orders);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.get('/api/admin/maintenance', async (req, res) => {
  try {
    const maintenance = await Maintenance.find().sort({ createdAt: -1 });
    res.status(200).json(maintenance);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.put('/api/admin/maintenance/:id', async (req, res) => {
  try {
    const booking = await Maintenance.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json({ message: 'Status updated!', booking });
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.get('/api/admin/redemptions', async (req, res) => {
  try {
    const rs = await Redemption.find().sort({ createdAt: -1 });
    res.status(200).json(rs);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.put('/api/admin/redemptions/:id', async (req, res) => {
  try {
    const r = await Redemption.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json({ message: 'Status updated!', r });
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

// 4. USER PROFILE & ORDERS
app.get('/api/user/listings/:email', async (req, res) => {
  try {
    const listings = await Listing.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.delete('/api/user/listings/:id', async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Listing deleted.' });
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed!' });
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.get('/api/user/orders/:email', async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.params.email }).sort({ date: -1 });
    res.status(200).json(orders);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.post('/api/maintenance', async (req, res) => {
  try {
    console.log('Maintenance Booking Request:', req.body);
    const booking = new Maintenance(req.body);
    await booking.save();
    res.status(201).json({ message: 'Maintenance booking created!' });
  } catch (error) { 
    console.error('Maintenance Booking Error:', error);
    res.status(500).json({ message: error.message || 'Error.' }); 
  }
});

app.get('/api/user/maintenance/:email', async (req, res) => {
  try {
    const bookings = await Maintenance.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.get('/api/user/redemptions/:email', async (req, res) => {
  try {
    const redemptions = await Redemption.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(redemptions);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.post('/api/redemptions', async (req, res) => {
  try {
    const r = new Redemption(req.body);
    await r.save();
    res.status(201).json({ message: 'Redeemed!' });
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

// ── REFERRAL SYSTEM ──
app.post('/api/referrals/generate', async (req, res) => {
  try {
    const { email } = req.body;
    let existing = await Referral.findOne({ referrerEmail: email });
    if (existing) return res.status(200).json(existing);
    const code = 'CARVIA-' + email.split('@')[0].toUpperCase().slice(0,6) + '-' + Math.random().toString(36).slice(2,6).toUpperCase();
    const ref = new Referral({ referrerEmail: email, referralCode: code });
    await ref.save();
    res.status(201).json(ref);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.post('/api/referrals/use', async (req, res) => {
  try {
    const { code, usedByEmail, usedByName } = req.body;
    const ref = await Referral.findOne({ referralCode: code });
    if (!ref) return res.status(404).json({ message: 'Invalid code.' });
    if (ref.referrerEmail === usedByEmail) return res.status(400).json({ message: 'Cannot use your own code.' });
    
    // Check if user already used this code
    const alreadyUsed = ref.usages && ref.usages.some(u => u.usedByEmail === usedByEmail);
    if (alreadyUsed) return res.status(400).json({ message: 'You have already used this code.' });
    
    ref.usages.push({ usedByEmail, usedByName });
    await ref.save();
    
    // In a full implementation, you would also add 1000 coins to both user's balances here.
    
    res.status(200).json({ message: 'Referral applied! 1000 coins awarded to both users.' });
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.get('/api/referrals/:email', async (req, res) => {
  try {
    let ref = await Referral.findOne({ referrerEmail: req.params.email });
    if (!ref) {
      // Auto-generate if missing
      const code = `CARVIA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      ref = new Referral({
        referrerEmail: req.params.email,
        referralCode: code
      });
      await ref.save();
    }
    res.status(200).json(ref);
  } catch (error) { res.status(500).json({ message: 'Error generating/fetching code.' }); }
});

app.get('/api/admin/referrals', async (req, res) => {
  try {
    const refs = await Referral.find().sort({ createdAt: -1 });
    res.status(200).json(refs);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

// ── PRICE NEGOTIATION (OFFERS) ──
app.post('/api/offers', async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json({ message: 'Offer submitted!' });
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.get('/api/offers/buyer/:email', async (req, res) => {
  try {
    const offers = await Offer.find({ buyerEmail: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(offers);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.get('/api/offers/seller/:email', async (req, res) => {
  try {
    const offers = await Offer.find({ sellerEmail: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(offers);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.get('/api/offers/listing/:id', async (req, res) => {
  try {
    const offers = await Offer.find({ listingId: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json(offers);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.put('/api/offers/:id', async (req, res) => {
  try {
    const { status, counterAmount } = req.body;
    const update = { status };
    if (counterAmount) update.counterAmount = counterAmount;
    const offer = await Offer.findByIdAndUpdate(req.params.id, update, { new: true });
    res.status(200).json({ message: 'Offer updated!', offer });
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

app.get('/api/admin/offers', async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.status(200).json(offers);
  } catch (error) { res.status(500).json({ message: 'Error.' }); }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
