import { Injectable } from '@nestjs/common';
import { CreateCandidentDto } from './dto/create-candident.dto';
import { UpdateCandidentDto } from './dto/update-candident.dto';

@Injectable()
export class CandidentService {
  create(createCandidentDto: CreateCandidentDto) {
    return 'This action adds a new candident';
  }

  findAll() {
    return `This action returns all candident`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candident`;
  }

  update(id: number, updateCandidentDto: UpdateCandidentDto) {
    return `This action updates a #${id} candident`;
  }

  remove(id: number) {
    return `This action removes a #${id} candident`;
  }
}
