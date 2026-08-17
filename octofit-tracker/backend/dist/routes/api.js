import { Router } from 'express';
import { ActivityModel } from '../models/Activity';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';
const router = Router();
router.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
router.get('/users', async (_req, res) => {
    try {
        const users = await UserModel.find().lean();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to load users', error });
    }
});
router.post('/users', async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create user', error });
    }
});
router.get('/activities', async (_req, res) => {
    try {
        const activities = await ActivityModel.find().sort({ date: -1 }).lean();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to load activities', error });
    }
});
router.post('/activities', async (req, res) => {
    try {
        const activity = await ActivityModel.create(req.body);
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create activity', error });
    }
});
router.get('/teams', async (_req, res) => {
    try {
        const teams = await TeamModel.find().lean();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to load teams', error });
    }
});
router.post('/teams', async (req, res) => {
    try {
        const team = await TeamModel.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create team', error });
    }
});
router.get('/workouts', async (_req, res) => {
    try {
        const workouts = await WorkoutModel.find().lean();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to load workouts', error });
    }
});
router.post('/workouts', async (req, res) => {
    try {
        const workout = await WorkoutModel.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create workout', error });
    }
});
router.get('/leaderboard', async (_req, res) => {
    try {
        const leaderboard = await LeaderboardEntryModel.find().sort({ points: -1 }).lean();
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to load leaderboard', error });
    }
});
router.post('/leaderboard', async (req, res) => {
    try {
        const entry = await LeaderboardEntryModel.create(req.body);
        res.status(201).json(entry);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create leaderboard entry', error });
    }
});
export default router;
