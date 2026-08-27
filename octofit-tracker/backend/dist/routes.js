import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';
const router = Router();
const resources = [
    ['users', User],
    ['teams', Team],
    ['activities', Activity],
    ['leaderboard', Leaderboard],
    ['workouts', Workout],
];
for (const [name, model] of resources) {
    router.get(`/${name}`, async (_request, response, next) => {
        try {
            const documents = await model.find().sort({ createdAt: -1 }).lean();
            response.json(documents);
        }
        catch (error) {
            next(error);
        }
    });
    router.post(`/${name}`, async (request, response, next) => {
        try {
            const document = await model.create(request.body);
            response.status(201).json(document);
        }
        catch (error) {
            next(error);
        }
    });
}
router.get('/health', (_request, response) => {
    response.json({ status: 'ok' });
});
export default router;
