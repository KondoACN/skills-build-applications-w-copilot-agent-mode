import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  name: string;
  points: number;
  teamName: string;
  streak: number;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    points: { type: Number, default: 0 },
    teamName: { type: String, default: 'Solo' },
    streak: { type: Number, default: 1 },
  },
  { timestamps: true },
);

export const LeaderboardEntryModel: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
