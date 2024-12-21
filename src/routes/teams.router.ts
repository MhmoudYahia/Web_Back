import { Router } from 'express';
import { TeamController } from '../controllers/teams.controller';

const router = Router();
const teamController = new TeamController();

// GET /teams - Get all teams
router.get('/', teamController.getTeams);

export { router as teamRouter };