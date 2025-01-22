import { IsBoolean, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'The name of the role',
    type: String,
    minLength: 4,
  })
  @IsString({ message: 'The name must be a string.' })
  @MinLength(4, { message: 'The password must be at least 4 characters long.' })
  name: string;

  @ApiProperty({
    description: 'Indicates whether the role is a configurator',
    type: Boolean,
  })
  @IsBoolean({ message: 'The name must be a boolean.' })
  isConfigurator: boolean;
}
