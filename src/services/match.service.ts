import prisma from '../common/utils/prismaClient';
import { Match } from '@prisma/client';

export class MatchService {
  async create(data: any): Promise<Match> {
    return prisma.match.create({
      data: {
        homeTeam: { connect: { id: data.homeTeamId } },
        awayTeam: { connect: { id: data.awayTeamId } },
        stadium: { connect: { id: data.stadiumId } },
        mainReferee: { connect: { id: data.mainRefereeId } },
        dateTime: new Date(data.dateTime),
        linesmen: {
          connect: data.linesmenIds.map((id: number) => ({ id })),
        },
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        stadium: true,
        mainReferee: true,
        linesmen: true,
      },
    });
  }

  async update(id: number, data: any): Promise<Match> {
    return prisma.match.update({
      where: { id },
      data: {
        homeTeam: data.homeTeamId
          ? { connect: { id: data.homeTeamId } }
          : undefined,
        awayTeam: data.awayTeamId
          ? { connect: { id: data.awayTeamId } }
          : undefined,
        stadium: data.stadiumId
          ? { connect: { id: data.stadiumId } }
          : undefined,
        mainReferee: data.mainRefereeId
          ? { connect: { id: data.mainRefereeId } }
          : undefined,
        dateTime: data.dateTime ? new Date(data.dateTime) : undefined,
        linesmen: data.linesmenIds
          ? {
              set: [],
              connect: data.linesmenIds.map((id: number) => ({ id })),
            }
          : undefined,
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        stadium: true,
        mainReferee: true,
        linesmen: true,
      },
    });
  }

  async findAll(): Promise<Match[]> {
    return prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
        stadium: true,
        mainReferee: true,
        linesmen: true,
      },
    });
  }

  async findById(id: number): Promise<Match | null> {
    return prisma.match.findUnique({
      where: { id },
      include: {
        homeTeam: true,
        awayTeam: true,
        stadium: true,
        mainReferee: true,
        linesmen: true,
        tickets: true,
      },
    });
  }
}
