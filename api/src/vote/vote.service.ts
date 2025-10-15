import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVoteDto } from './dto';

@Injectable()
export class VoteService {
  private readonly logger = new Logger(VoteService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateVoteDto) {
    try {
      const vote = await this.prismaService.vote.create({
        data: {
          vid: dto.vid,
          code: dto.code,
          candident: dto.candident,
        },
      });
      return {
        statusCode: 201,
        message: 'vote created',
        data: {
          vote,
        },
      };
    } catch (error: unknown) {
      let message: string;

      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }

      this.logger.error('Create vote failed:', message);
      throw new InternalServerErrorException('Could not create vote');
    }
  }

  async getAll() {
    try {
      const [votes, count] = await this.prismaService.$transaction([
        this.prismaService.vote.findMany(),
        this.prismaService.vote.count(),
      ]);
      return {
        statusCode: 200,
        count: count,
        data: {
          votes,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Fetch vote failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not find vote');
    }
  }

  async Updatevote(dto: CreateVoteDto, vid: string) {
    try {
      const vote = await this.prismaService.vote.update({
        where: {
          vid: vid,
        },
        data: {
          code: dto.code,
          candident: dto.candident,
        },
      });

      return {
        statusCode: 204,
        message: 'vote updated',
        data: {
          vote,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Update Vote failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not update vote');
    }
  }

  async getOne(vid: string) {
    try {
      const vote = await this.prismaService.vote.findUnique({
        where: { vid },
      });
      if (!vote) {
        throw new ForbiddenException("L'vote n'existe pas");
      }
      return {
        statusCode: 200,
        data: {
          vote,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Fetch vote failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not find vote');
    }
  }

  async deleteVote(vid: string) {
    try {
      const vote = await this.prismaService.vote.delete({
        where: {
          vid: vid,
        },
      });
      return {
        statusCode: 204,
        message: 'vote deleted',
        data: {
          vote,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Delete vote failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not delete vote');
    }
  }
}
