import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { Role } from '@prisma/client';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async approveUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const newRole = req.body.role as Role;
      const user = await this.userService.approveUser(userId, newRole);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to approve user' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      await this.userService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete user' });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const user = await this.userService.updateUserProfile(userId, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update profile' });
    }
  }
}
