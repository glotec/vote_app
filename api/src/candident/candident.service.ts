import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCandidentDto } from './dto';
@Injectable()
export class CandidentService {
  private readonly logger = new Logger(CandidentService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCandidentDto) {
    try {
      const cand = await this.prismaService.candident.create({
        data: {
          cid: dto.cid,
          name: dto.name,
          cycle: dto.cycle,
        },
      });
      return {
        statusCode: 201,
        message: 'cand created',
        data: {
          cand,
        },
      };
    } catch (error: unknown) {
      let message: string;

      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }

      this.logger.error('Create candident failed:', message);
      throw new InternalServerErrorException('Could not create candident');
    }
  }

  async getAll() {
    try {
      const [cands, count] = await this.prismaService.$transaction([
        this.prismaService.candident.findMany(),
        this.prismaService.candident.count(),
      ]);
      return {
        statusCode: 200,
        count: count,
        data: {
          cands,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Fetch candident failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not find avenue');
    }
  }

  async updateAvenue(dto: CreateCandidentDto, cid: string) {
    try {
      const avenue = await this.prismaService.candident.update({
        where: {
          cid: cid,
        },
        data: {
          name: dto.name,
          cycle: dto.cycle,
        },
      });

      return {
        statusCode: 204,
        message: 'avenue updated',
        data: {
          avenue,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Update avenue failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not update avenue');
    }
  }

  async getOne(cid: string) {
    try {
      const candident = await this.prismaService.candident.findUnique({
        where: { cid },
      });
      if (!candident) {
        throw new ForbiddenException("L'candident n'existe pas");
      }
      return {
        statusCode: 200,
        data: {
          candident,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Fetch avenue failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not find avenue');
    }
  }

  async deleteAvenue(cid: string) {
    try {
      const avenue = await this.prismaService.candident.delete({
        where: {
          cid: cid,
        },
      });
      return {
        statusCode: 204,
        message: 'avenue deleted',
        data: {
          avenue,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Delete avenue failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not delete avenue');
    }
  }
}
