import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityEntity } from '../../common/entities/BaseEntity.entity';

@Entity()
export class Category extends BaseEntityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
