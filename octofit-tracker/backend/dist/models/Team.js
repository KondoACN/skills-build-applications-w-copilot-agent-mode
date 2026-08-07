import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, trim: true, unique: true },
    members: { type: [String], default: [] },
    points: { type: Number, default: 0 },
    focus: { type: String, default: 'wellness' },
}, { timestamps: true });
export const TeamModel = mongoose.model('Team', teamSchema);
