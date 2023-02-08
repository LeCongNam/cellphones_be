import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  BaseController,
  GetParams,
} from '../common/controller/BaseController.controller';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FindOneResponse } from 'src/common/custom_res/FindOneResponse';

// import { user_data } from '../common/mock_data/mock_data';

@Controller('user')
export class UserController implements BaseController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new FindOneResponse())
  @Get('profile')
  async getProfile(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findOneByParams({ id });
  }

  @Post('register')
  create(@Body() user: UserDto) {
    return this.userService.registerUser(user);
  }

  @Get()
  findAll(@Query() params: GetParams): any {
    return this.userService.findAll(params);
  }

  @Get(':id')
  @UseInterceptors(new FindOneResponse())
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOneById(id);
  }

  @Put()
  update(data: any): any {
    return data;
  }

  @Delete()
  delete(data: any): any {
    return data;
  }
}
