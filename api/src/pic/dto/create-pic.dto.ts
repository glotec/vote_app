import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePicDto {
  @IsString()
  @IsNotEmpty()
  pid!: string;

  @IsString()
  @IsOptional()
  pic?: string;

  @IsString()
  @IsNotEmpty()
  cand!: string;

  //   @IsBoolean()
  //   @IsOptional()
  //   status!: boolean;
}
