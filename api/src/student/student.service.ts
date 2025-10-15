import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto';

@Injectable()
export class StudentService {
  private readonly logger = new Logger(StudentService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateStudentDto) {
    try {
      const person = await this.prismaService.student.create({
        data: {
          mat: dto.mat,
          fullname: dto.fullname,
          class: dto.class,
        },
      });
      return {
        statusCode: 201,
        message: 'person created',
        data: {
          person,
        },
      };
    } catch (error: unknown) {
      let message: string;

      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }

      this.logger.error('Create personne failed:', message);
      throw new InternalServerErrorException('Could not create personne');
    }
  }

  async getAll() {
    try {
      const [persons, count] = await this.prismaService.$transaction([
        this.prismaService.student.findMany(),
        this.prismaService.student.count(),
      ]);
      return {
        statusCode: 200,
        count: count,
        data: {
          persons,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Fetch personnes failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not find personnes');
    }
  }

  async updatePersonne(dto: CreateStudentDto, mat: string) {
    try {
      const pers = await this.prismaService.student.update({
        where: {
          mat: mat,
        },
        data: {
          fullname: dto.fullname,
          class: dto.class,
        },
      });

      return {
        statusCode: 204,
        message: 'personne updated',
        data: {
          pers,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Update personne failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not update personne');
    }
  }

  async getOne(mat: string) {
    try {
      const pers = await this.prismaService.student.findUnique({
        where: { mat },
      });
      if (!pers) {
        throw new ForbiddenException("La personne n'existe pas");
      }
      return {
        statusCode: 200,
        data: {
          pers,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Fetch personne failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not find personne');
    }
  }

  async deletePersonne(mat: string) {
    try {
      const pers = await this.prismaService.student.delete({
        where: {
          mat: mat,
        },
      });
      return {
        statusCode: 204,
        message: 'personne deleted',
        data: {
          pers,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Delete personne failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not delete personne');
    }
  }
}
