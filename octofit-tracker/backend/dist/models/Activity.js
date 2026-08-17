import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    distanceKm: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    note: { type: String, trim: true },
}, { timestamps: true });
export const ActivityModel = mongoose.model('Activity', activitySchema);
