import { Request, Response } from 'express';
import { TeamService } from '../services/team.service';

export class TeamController {
    private teamService: TeamService;

    constructor() {
        this.teamService = new TeamService();
        this.getTeams = this.getTeams.bind(this);
    }

    async getTeams(req: Request, res: Response) {
        try {
            const teams = await this.teamService.findAll();
            res.json(teams);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch teams' });
        }
    }
}