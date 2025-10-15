import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCandidentDto {
  @IsString()
  @IsNotEmpty()
  cid!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  cycle!: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
