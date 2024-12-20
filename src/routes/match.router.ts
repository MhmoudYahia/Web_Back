import { Router } from 'express';
import { MatchController } from '../controllers/match.controller';
import { requireAuth } from '../common/middlewares/requireAuth';
import { Role } from '@prisma/client';

const router = Router();
const matchController = new MatchController();

router.post('/', requireAuth([Role.ADMIN, Role.EFA_MANAGER]), matchController.createMatch);

router.get('/', matchController.getMatches);

router.get('/:id', matchController.getMatchById);

router.patch('/:id', requireAuth([Role.ADMIN, Role.EFA_MANAGER]), matchController.updateMatch);

export { router as matchRouter };
