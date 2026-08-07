import mongoose, { Schema } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    points: { type: Number, default: 0 },
    teamName: { type: String, default: 'Solo' },
    streak: { type: Number, default: 1 },
}, { timestamps: true });
export const LeaderboardEntryModel = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
