import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'; // Đối tượng typeorm để tạo bảng
import { IsNumber, IsString, Min } from 'class-validator';
import { BaseEntityEntity } from '../../common/entities/BaseEntity.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Product extends BaseEntityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column({
    type: 'float',
    default: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @Column({
    type: 'int',
    default: 0,
  })
  @IsNumber()
  @Min(0)
  quantity: number;

  @Column()
  @IsString()
  thumbnail: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  brand: string;

  @Column({
    type: 'uuid',
  })
  @IsString()
  @ManyToOne(() => Category, (category) => category.products, { cascade: true })
  @JoinColumn()
  category: string;
}
