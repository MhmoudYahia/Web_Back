import { Router } from 'express';
import { StadiumController } from '../controllers/stadium.controller';
import { validateRequest } from '../common/middlewares/validateRequest';
import { createStadiumSchema } from '../common/schemas/stadium';
import { requireAuth } from '../common/middlewares/requireAuth';
const router = Router();
const stadiumController = new StadiumController();

router.post(
  '/',
  requireAuth(['ADMIN', 'EFA_MANAGER']),
  validateRequest(createStadiumSchema),
  stadiumController.createStadium
);

router.get('/', stadiumController.getStadiums);

export { router as stadiumRouter };
