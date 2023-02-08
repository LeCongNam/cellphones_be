import { IsString, IsInt, IsEmail, IsStrongPassword } from 'class-validator';
import { Optional, UseInterceptors } from '@nestjs/common';

import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    enum: ['nguyendanhdat'],
  })
  @Expose()
  @Optional()
  @IsString()
  username: string;

  @Expose()
  @Optional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    enum: ['abcd123'],
  })
  @Expose()
  @IsString()
  @IsStrongPassword()
  password: string;
}
