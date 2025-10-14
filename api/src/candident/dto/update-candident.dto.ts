import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidentDto } from './create-candident.dto';

export class UpdateCandidentDto extends PartialType(CreateCandidentDto) {}
