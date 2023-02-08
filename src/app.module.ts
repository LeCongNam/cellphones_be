import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { UserModule } from './users/user.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { ProductModule } from './products/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { TestModule } from './test_module/test.module';
import { Role } from './users/entity/role-user.entity';

@Module({
  imports: [
    // Thư viện này dùng để cấu hình môi trường file: .env
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://cellphones_be:gHuKODgDP3TqUcm9pQNmJoxDxfPBWYit@dpg-cfhjou82i3murc9pjug0-a.singapore-postgres.render.com/cellphones_be',
      ssl: true,
      // host: process.env.DB_HOST,
      // port: Number(process.env.DB_PORT) || 5432,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      entities: [Category, Product, User, Role],
      synchronize: true,
      // logging: 'all',
    }),
    // Cấu hình folder tĩnh trong folder public để truy cập
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // Các module
    UserModule,
    TestModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
