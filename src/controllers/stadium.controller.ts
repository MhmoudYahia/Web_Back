import { Request, Response } from 'express';
import { StadiumService } from '../services/stadium.service';

export class StadiumController {
  private stadiumService: StadiumService;

  constructor() {
    this.stadiumService = new StadiumService();
  }

  async createStadium(req: Request, res: Response) {
    try {
      const stadium = await this.stadiumService.create(req.body);
      res.status(201).json(stadium);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create stadium' });
    }
  }

  async getStadiums(req: Request, res: Response) {
    try {
      const stadiums = await this.stadiumService.findAll();
      res.json(stadiums);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stadiums' });
    }
  }

  async getStadiumById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const stadium = await this.stadiumService.findById(Number(id));
      if (!stadium) {
        return res.status(404).json({ error: 'Stadium not found' });
      }
      res.json(stadium);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stadium' });
    }
  }

  async updateStadium(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const stadium = await this.stadiumService.update(Number(id), req.body);
      res.json(stadium);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update stadium' });
    }
  }

  async deleteStadium(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.stadiumService.delete(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete stadium' });
    }
  }

  
}
