import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto';

@Controller('api/vote/v1/vote')
export class VoteController {
  constructor(private readonly communeService: VoteService) {}

  @Post('create')
  create(@Body() dto: CreateVoteDto) {
    return this.communeService.create(dto);
  }

  @Get('all')
  findAll() {
    return this.communeService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communeService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateVoteDto) {
    return this.communeService.Updatevote(dto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communeService.deleteVote(id);
  }
}
