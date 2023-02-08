import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { Optional } from '@nestjs/common';

export class BaseEntityEntity {
  @Optional()
  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @Optional()
  @UpdateDateColumn()
  updatedDate: Date;

  @Expose()
  @Optional()
  @DeleteDateColumn()
  deletedDate: Date;
}
