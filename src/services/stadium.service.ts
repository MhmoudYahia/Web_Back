import prisma from '../common/utils/prismaClient';
import { Stadium, Ticket } from '@prisma/client';

export class StadiumService {
  async create(data: any): Promise<Stadium> {
    return prisma.stadium.create({
      data: {
        ...data
      }
    });
  }

  async findAll(): Promise<Stadium[]> {
    return prisma.stadium.findMany();
  }

  async findById(id: number): Promise<Stadium | null> {
    return prisma.stadium.findUnique({
      where: { id }
    });
  }

  async update(id: number, data: any): Promise<Stadium> {
    return prisma.stadium.update({
      where: { id },
      data
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.stadium.delete({
      where: { id }
    });
  }
}