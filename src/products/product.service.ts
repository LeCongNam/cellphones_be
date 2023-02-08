import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  GetParams,
  KeyDefaultParams,
} from 'src/common/controller/BaseController.controller';
import { log } from 'console';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: Product) {
    return await this.productRepository.save(createProductDto);
  }

  async findAll(params: GetParams | any) {
    const search: GetParams = {
      _limit: 10,
      _page: 1,
      _sort: 'ASC',
      _filter: [],
    };

    for (const key in params) {
      if (
        key === '_limit' ||
        key === '_page' ||
        key === '_limit' ||
        key === '_sort'
      ) {
        if (key === '_limit' || key === '_page') {
          if (key === '_page') {
            const page = Number(params[key]) - 1;
            page > 0 ? (search[key] = page) : (search[key] = 0);
          } else;
          search[key] = +params[key];
        } else search[key] = params[key];

        delete params[key];
      }
    }
    const data = await this.productRepository.findAndCount({
      where: { ...params },
      // take: search._limit || 10,
      // skip: search._page * search._limit || 0,
      // order: { createdAt: search._sort },
      // relations: ['category'],
    });

    return data;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    return product;
  }

  async update(id: number, productUpdate: Product) {
    return await this.productRepository.update(id, productUpdate);
  }

  async remove(id: string) {
    const product = this.productRepository.findOneBy({ id });
    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    await this.productRepository.softRemove({ id });
    return product;
  }
}
