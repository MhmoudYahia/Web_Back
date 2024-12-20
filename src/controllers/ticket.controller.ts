import { Request, Response } from 'express';
import { TicketService } from '../services/ticket.service';

export class TicketController {
  private ticketService: TicketService;

  constructor() {
    this.ticketService = new TicketService();
  }

  reserveTicket = async (req: Request, res: Response) => {
    try {
      const ticket = await this.ticketService.createTicket(
        res.locals.user.id,
        req.body
      );
      res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({
        error:
          error instanceof Error ? error.message : 'Failed to reserve ticket',
      });
    }
  };

  cancelTicket = async (req: Request, res: Response) => {
    try {
      const ticket = await this.ticketService.cancelTicket(
        Number(req.params.id),
        res.locals.user.id
      );
      res.json(ticket);
    } catch (error) {
      res.status(400).json({
        error:
          error instanceof Error ? error.message : 'Failed to cancel ticket',
      });
    }
  };

  getUserTickets = async (req: Request, res: Response) => {
    try {
      const tickets = await this.ticketService.getUserTickets(
        res.locals.user.id
      );
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tickets' });
    }
  };
}
