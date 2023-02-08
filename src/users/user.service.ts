import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import * as bcrypt from 'bcrypt';

import { User } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import {
  GetParams,
  KeyDefaultParams,
} from '../common/controller/BaseController.controller';
import { UserFind } from 'src/auth/dto/user-find.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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

    const data = await this.usersRepository.findAndCount({
      where: [params],
      take: search._limit,
      skip: search._page,
    });
    return data;
  }

  async hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) reject(err);
        else
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
          });
      });
    });
  }

  async registerUser(user: UserDto) {
    const userExists = await this.usersRepository.findOneBy([
      {
        email: user.email,
      },
      {
        username: user.username,
      },
    ]);
    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const passwordHashed = await this.hashPassword(user.password);
    user.password = passwordHashed;
    const userInsert = await this.usersRepository.save(user);
    delete userInsert.password;

    return userInsert;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      id,
    });
    if (!user) {
      throw new HttpException(
        `User ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.usersRepository.save(user);
  }

  async findOneByParams(params: UserFind | any): Promise<User> {
    const user: any = await this.usersRepository.findOne({
      where: { ...params },
      relations: ['role'],
    });
    if (!user) {
      throw new HttpException(`User  does not exist`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByUsername(username: string): Promise<boolean | User> {
    const user = await this.usersRepository.findOneBy({
      username,
    });
    if (!user) {
      return false;
    }
    return user;
  }

  async updateUser(userId: string, data: UserUpdateDto | any) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) new HttpException('user not found', HttpStatus.NOT_FOUND);

    return await this.usersRepository.save({
      ...user,
      data,
    });
  }
}
