import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CandidentService } from './candident.service';
import { CreateCandidentDto } from './dto/create-candident.dto';
import { UpdateCandidentDto } from './dto/update-candident.dto';

@Controller('candident')
export class CandidentController {
  constructor(private readonly candidentService: CandidentService) {}

  @Post()
  create(@Body() createCandidentDto: CreateCandidentDto) {
    return this.candidentService.create(createCandidentDto);
  }

  @Get()
  findAll() {
    return this.candidentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCandidentDto: UpdateCandidentDto) {
    return this.candidentService.update(+id, updateCandidentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidentService.remove(+id);
  }
}
