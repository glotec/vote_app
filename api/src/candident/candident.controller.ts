import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CandidentService } from './candident.service';
import { CreateCandidentDto } from './dto';

@Controller('api/vote/v1/candident')
export class CandidentController {
  constructor(private readonly candidentService: CandidentService) {}

  @Post('create')
  create(@Body() dto: CreateCandidentDto) {
    return this.candidentService.create(dto);
  }

  @Get('all')
  findAll() {
    return this.candidentService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidentService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateCandidentDto) {
    return this.candidentService.updateAvenue(dto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidentService.deleteAvenue(id);
  }
}
