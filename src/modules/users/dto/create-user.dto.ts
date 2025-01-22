import { IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    type: String,
  })
  @IsEmail({}, { message: 'The email must be a valid email address.' })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
    minLength: 6,
  })
  @IsString({ message: 'The password must be a string.' })
  @MinLength(6, { message: 'The password must be at least 6 characters long.' })
  password: string;

  @ApiProperty({
    description: 'The name of the user (optional)',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'The name must be a string.' })
  name: string;

  @ApiProperty({
    description: 'The role ID for the user',
    type: String,
  })

  @Matches(/^[a-zA-Z0-9]{25}$/, { message: 'The roleId must be a valid 24-character alphanumeric string.' })
  roleId: string;
}
