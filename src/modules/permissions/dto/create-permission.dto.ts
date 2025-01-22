import { IsArray, IsString, ArrayNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'The endpoint of the permission',
    type: String,
  })
  @IsString({ message: 'The endpoint must be a valid string.' })
  endpoint: string;

  @ApiProperty({
    description: 'The methods of the permission',
    type: [String],
    isArray: true,
  })
  @IsArray({ message: 'The methods must be an array of strings.' })
  @ArrayNotEmpty({ message: 'The methods array should not be empty.' })
  @IsString({ each: true, message: 'Each method in the methods array must be a string.' })
  methods: string[];

  @ApiProperty({
    description: 'The role ID for the permision',
    type: String,
  })
  
  @Matches(/^[a-zA-Z0-9]{25}$/, { message: 'The roleId must be a valid 24-character alphanumeric string.' })
  roleId: string;
  
}
