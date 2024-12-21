import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { Role } from '@prisma/client';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.approveUser = this.approveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  async approveUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);

      // Check if user with given ID exists and is not an admin
      if (!userId) return res.status(404).json({ error: 'User not found' });

      const newRole = req.body.role as Role;
      const user = await this.userService.approveUser(userId, newRole);

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Failed to approve user' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      await this.userService.deleteUser(+userId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete user' });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = parseInt(res.locals.user.id);
      // Validate and sanitize user input
      console.log('userId', userId);
      
      if (!userId) return res.status(400).json({ error: 'Server error' });

      console.log('req.body', req.body);
      console.log('userId', userId);
      
      
      const user = await this.userService.updateUserProfile(userId, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update profile' });
    }
  }
}
