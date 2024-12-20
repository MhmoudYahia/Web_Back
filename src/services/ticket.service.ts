import prisma from '../common/utils/prismaClient';

export enum TicketStatus {
  RESERVED = 'RESERVED',
  CANCELLED = 'CANCELLED',
  USED = 'USED',
}

export class TicketService {
  async createTicket(userId: number, data: any) {
    const existingTicket = await prisma.ticket.findFirst({
      where: {
        matchId: data.matchId,
        seatNo: data.seatNo,
        status: TicketStatus.RESERVED,
      },
    });

    if (existingTicket) {
      throw new Error('Seat already reserved');
    }

    return prisma.ticket.create({
      data: {
        userId,
        matchId: data.matchId,
        seatNo: data.seatNo,
        status: TicketStatus.RESERVED,
      },
      include: {
        match: {
          include: {
            homeTeam: true,
            awayTeam: true,
            stadium: true,
          },
        },
      },
    });
  }

  async cancelTicket(ticketId: number, userId: number) {
    const ticket = await prisma.ticket.findFirst({
      where: { id: ticketId, userId },
    });

    if (!ticket || ticket.status !== TicketStatus.RESERVED) {
      throw new Error('Ticket not found or cannot be cancelled');
    }

    return prisma.ticket.update({
      where: { id: ticketId },
      data: { status: TicketStatus.CANCELLED },
      include: {
        match: {
          include: {
            homeTeam: true,
            awayTeam: true,
            stadium: true,
          },
        },
      },
    });
  }

  async getUserTickets(userId: number) {
    return prisma.ticket.findMany({
      where: { userId },
      include: {
        match: {
          include: {
            homeTeam: true,
            awayTeam: true,
            stadium: true,
          },
        },
      },
    });
  }
}
