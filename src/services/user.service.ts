import prisma from '../common/utils/prismaClient';
import { Role, User } from '@prisma/client';

export class UserService {
  async approveUser(userId: number, newRole: Role): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: { role: newRole }
    });
  }

  async deleteUser(userId: number): Promise<void> {
    await prisma.user.delete({
      where: { id: userId }
    });
  }

  async updateUserProfile(userId: number, data: Partial<User>): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        address: data.address
      }
    });
  }
}