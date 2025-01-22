import { IsString, IsUUID, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    type: String,
  })
  @IsString({ message: 'The title must be a string.' })
  title: string;

  @ApiProperty({
    description: 'The description of the user',
    type: String,
    minLength: 10,
  })
  @IsString({ message: 'The description must be a string.' })
  @MinLength(10, {
    message: 'The description must be at least 10 characters long.',
  })
  description: string;

  @ApiProperty({
    description: 'The user ID for the task',
    type: String,
  })
  
  @Matches(/^[a-zA-Z0-9]{25}$/, { message: 'The roleId must be a valid 24-character alphanumeric string.' })
  userId: string;
}
