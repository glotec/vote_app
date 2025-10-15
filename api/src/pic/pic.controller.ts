import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PicService } from './pic.service';
import { CreatePicDto } from './dto';

@Controller('api/vote/v1/pics')
export class PicController {
  constructor(private readonly picturesService: PicService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSufix =
            Date.now() + '_' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSufix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreatePicDto,
  ) {
    return this.picturesService.create(file, dto);
  }

  @Get('all')
  findAll() {
    return this.picturesService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.picturesService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreatePicDto) {
    return this.picturesService.updatePicture(dto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.picturesService.deletePicture(id);
  }
}
