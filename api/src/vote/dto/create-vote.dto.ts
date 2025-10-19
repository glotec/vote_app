import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVoteDto {
  @IsString()
  @IsNotEmpty()
  vid!: string;

  // @IsString()
  // @IsNotEmpty()
  // code!: string;

  @IsString()
  @IsNotEmpty()
  candident!: string;
}
