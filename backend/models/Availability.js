import mongoose from "mongoose";

const UserAvailabilitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  availableSlots: [
    {
      day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], required: true },
      timeStart: { type: String, required: true }, // e.g., "09:00 AM"
      timeEnd: { type: String, required: true }   // e.g., "05:00 PM"
    }
  ],
  unavailableDates: [{ type: Date }] // Users can block specific dates
});

export default mongoose.model("UserAvailability", UserAvailabilitySchema);
