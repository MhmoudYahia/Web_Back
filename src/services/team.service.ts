import prisma from '../common/utils/prismaClient';

export class TeamService {
  async findAll() {
    return prisma.team.findMany();
  }
}
