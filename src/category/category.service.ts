import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private category: Repository<Category>,
  ) {}

  async create(createCategory: CreateCategoryDto) {
    return await this.category.save(createCategory);
  }

  async findAll() {
    return await this.category.findAndCount();
  }

  async findOne(id: string) {
    return await this.category.findOneBy([{ id }]);
  }

  async update(id: string, updateCategoryDto: CreateCategoryDto) {
    return await this.category.update(id, updateCategoryDto);
  }

  async remove(id: any) {
    const getCategory = await this.category.findOne({ where: { id } });
    if (!getCategory)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    return this.category.softRemove(getCategory);
  }
}
