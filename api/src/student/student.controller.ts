import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto';

@Controller('api/vote/v1/student')
export class StudentController {
  constructor(private readonly personneService: StudentService) {}

  @Post('create')
  create(@Body() dto: CreateStudentDto) {
    return this.personneService.create(dto);
  }

  @Get('all')
  findAll() {
    return this.personneService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personneService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateStudentDto) {
    return this.personneService.updatePersonne(dto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personneService.deletePersonne(id);
  }
}
