import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { requireAuth } from '../common/middlewares/requireAuth';
import { validateRequest } from '../common';
import { approvalSchema, updateProfileSchema } from '../common/schemas/user';
import { Role } from '@prisma/client';

const router = Router();
const userController = new UserController();

router.patch(
  '/:id/approve',
  requireAuth([Role.ADMIN]),
  validateRequest(approvalSchema),
  userController.approveUser
);

router.delete('/:id', requireAuth([Role.ADMIN]), userController.deleteUser);

router.patch(
  '/:id',
  requireAuth([Role.FAN]),
  validateRequest(updateProfileSchema),
  userController.updateProfile
);

export { router as userRouter };
