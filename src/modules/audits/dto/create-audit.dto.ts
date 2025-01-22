import { IsString, IsUUID } from 'class-validator';

export class CreateAuditDto {
    @IsUUID('4', { message: 'The userId must be a valid UUID string.' })
    userId: string;

    @IsString({ message: 'The endpoint must be a string.' })
    endpoint: string;

    @IsString({ message: 'The method must be a string.' })
    method: string;

    @IsString({ message: 'The status must be a string.' })
    status: string;

    @IsString({ message: 'The message must be a string.' })
    message: string;
}
