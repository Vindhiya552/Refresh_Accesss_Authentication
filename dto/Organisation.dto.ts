// organisations/dto/create-organisation.dto.ts
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateOrganisationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  // letters/numbers/hyphen only for a clean short code
  @Matches(/^[A-Za-z0-9-]{2,20}$/, {
    message: 'code must be 2-20 chars, alphanumeric or hyphen',
  })
  code: string;

  @IsOptional()
  @IsString()
  domain?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
