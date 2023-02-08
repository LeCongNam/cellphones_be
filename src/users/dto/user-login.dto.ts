import { IsString, IsStrongPassword } from 'class-validator';
import { Optional } from '@nestjs/common';

import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({
    enum: ['nguyendanhdat'],
  })
  @Expose()
  @Optional()
  @IsString()
  username: string;

  @ApiProperty({
    enum: ['abcd123'],
  })
  @Expose()
  @IsString()
  @IsStrongPassword()
  password: string;
}
