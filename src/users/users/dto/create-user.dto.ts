import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly surname: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(60)
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  readonly password: string;
}
