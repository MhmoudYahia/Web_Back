import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller';

import { createTicketSchema } from '../common/schemas/ticket';
import { Role } from '@prisma/client';
import { requireAuth } from '../common/middlewares/requireAuth';
import { validateRequest } from '../common';

const router = Router();
const ticketController = new TicketController();

router.post(
  '/reserve',
  requireAuth([Role.FAN, Role.ADMIN]),
  validateRequest(createTicketSchema),
  ticketController.reserveTicket
);

router.patch(
  '/:id/cancel',
  requireAuth([Role.FAN, Role.ADMIN]),
  ticketController.cancelTicket
);

router.get(
  '/my-tickets',
  requireAuth([Role.FAN, Role.ADMIN]),
  ticketController.getUserTickets
);

export { router as ticketRouter };
