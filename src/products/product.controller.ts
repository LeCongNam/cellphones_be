import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetParams } from 'src/common/controller/BaseController.controller';
import { FindAllResponse } from 'src/common/custom_res/FindAllResponse';
import { FindOneResponse } from 'src/common/custom_res/FindOneResponse';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  // @UseInterceptors(new FindAllResponse())
  findAll(@Query() params: GetParams): any {
    return this.productService.findAll(params);
  }

  @Get(':id')
  // @UseInterceptors(new FindOneResponse())
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
