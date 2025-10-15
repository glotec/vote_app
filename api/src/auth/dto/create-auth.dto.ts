import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  fullname!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsBoolean()
  @IsOptional()
  is_connecter?: boolean;

  @IsBoolean()
  @IsOptional()
  activated?: boolean;

  @IsInt()
  @IsNotEmpty()
  role_id!: number;
}
