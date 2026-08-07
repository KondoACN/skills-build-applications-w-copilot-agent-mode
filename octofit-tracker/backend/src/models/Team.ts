import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: string[];
  points: number;
  focus: string;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    members: { type: [String], default: [] },
    points: { type: Number, default: 0 },
    focus: { type: String, default: 'wellness' },
  },
  { timestamps: true },
);

export const TeamModel: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
