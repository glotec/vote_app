import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVoteDto {
  @IsString()
  @IsNotEmpty()
  candident!: string;
}
