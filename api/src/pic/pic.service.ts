import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePicDto } from './dto';

@Injectable()
export class PicService {
  private readonly logger = new Logger(PicService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(file: Express.Multer.File, dto: CreatePicDto) {
    try {
      const pic = await this.prismaService.pic.create({
        data: {
          pid: dto.pid,
          name: file.filename,
          cand: dto.cand,
        },
      });
      return { statusCode: 201, message: 'picture created', data: { pic } };
    } catch (error) {
      let message = 'Unknown error';

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      }

      this.logger.error('Create picture failed:', message);
      throw new InternalServerErrorException('Could not create picture');
    }
  }

  async getAll() {
    try {
      const [pictures, count] = await this.prismaService.$transaction([
        this.prismaService.pic.findMany(),
        this.prismaService.pic.count(),
      ]);
      return {
        statusCode: 200,
        count: count,
        data: {
          pictures,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Fetch picture failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not find picture');
    }
  }

  async updatePicture(dto: CreatePicDto, pid: string) {
    try {
      const picture = await this.prismaService.pic.update({
        where: {
          pid: pid,
        },
        data: {
          name: dto.name,
          cand: dto.cand,
        },
      });

      return {
        statusCode: 204,
        message: 'Picture updated',
        data: {
          picture,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Update picture failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not update picture');
    }
  }

  async getOne(pid: string) {
    try {
      const picture = await this.prismaService.pic.findUnique({
        where: { pid },
      });
      if (!picture) {
        throw new ForbiddenException("Le picture n'existe pas");
      }
      return {
        statusCode: 200,
        data: {
          picture,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Fetch picture failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not find picture');
    }
  }

  async deletePicture(pid: string) {
    try {
      const picture = await this.prismaService.pic.delete({
        where: {
          pid: pid,
        },
      });
      return {
        statusCode: 204,
        message: 'picture deleted',
        data: {
          picture,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Delete picture failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not delete picture');
    }
  }
}
