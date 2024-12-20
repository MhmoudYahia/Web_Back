import { Request, Response } from 'express';
import { MatchService } from '../services/match.service';

export class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  async createMatch(req: Request, res: Response) {
    try {
      const match = await this.matchService.create(req.body);
      res.status(201).json(match);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create match' });
    }
  }

  async getMatches(req: Request, res: Response) {
    try {
      const matches = await this.matchService.findAll();
      res.json(matches);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch matches' });
    }
  }

  async getMatchById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const match = await this.matchService.findById(Number(id));
      if (!match) {
        return res.status(404).json({ error: 'Match not found' });
      }
      res.json(match);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch match' });
    }
  }

  async updateMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const match = await this.matchService.update(Number(id), req.body);
      res.json(match);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update match' });
    }
  }

  async getMatchSeatStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const seatStatus = await this.matchService.getMatchSeatStatnus(
        Number(id)
      );
      res.json(seatStatus);
    } catch (error) {
      res.status(400).json({
        error:
          error instanceof Error ? error.message : 'Failed to get seat status',
      });
    }
  }
}
