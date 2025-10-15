import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  mat!: string;

  @IsString()
  @IsNotEmpty()
  fullname!: string;

  @IsString()
  @IsNotEmpty()
  class!: string;
}
