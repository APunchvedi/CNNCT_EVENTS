import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const EventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventTopic: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  hostName: { type: String, required: true },
  password: { type: String },  // Will store hashed password
  link: { type: String, required: true },
  bannerImage: { type: String },
  backgroundColor: { type: String, default: "#000000" },
  status: { type: String, enum: ['upcoming', 'pending', 'canceled', 'rejected', 'past'], default: 'pending' },
  participants: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, status: { type: String, enum: ['accepted', 'rejected', 'pending'], default: 'pending' } }],
  createdAt: { type: Date, default: Date.now }
});

// **Hash Password Before Saving**
EventSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// **Compare Password Method**
EventSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// **Accept Event**
EventSchema.methods.acceptEvent = function () {
  this.status = 'upcoming';
};

// **Reject Event**
EventSchema.methods.rejectEvent = function () {
  this.status = 'rejected';
};

// **Mark Event as Past**
EventSchema.methods.markAsPast = function () {
  if (this.status === 'upcoming') {
    this.status = 'past';
  }
};

const Event = mongoose.model('Event', EventSchema);
export default Event;
