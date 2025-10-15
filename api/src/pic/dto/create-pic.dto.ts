import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePicDto {
  @IsString()
  @IsNotEmpty()
  pid!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  cand!: string;

  //   @IsBoolean()
  //   @IsOptional()
  //   status!: boolean;
}
