import { Request, Response } from 'express';
import prisma from '../common/utils/prismaClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const {
        username,
        password,
        email,
        firstName,
        lastName,
        birthDate,
        gender,
        city,
        address,
        role,
      } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          email,
          firstName,
          lastName,
          birthDate: new Date(birthDate),
          gender,
          city,
          address,
          role: role || 'FAN',
        },
      });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET!
      );

      res.status(201).json({ token, user: { ...user, password: undefined } });
    } catch (error) {
      res.status(400).json({ error: 'Registration failed' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET!
      );

      res.json({ token, user: { ...user, password: undefined } });
    } catch (error) {
      res.status(400).json({ error: 'Login failed' });
    }
  }
}
