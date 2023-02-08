import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*------- MiddleWare ------- */
  // Fix lỗi: CORS react api
  app.enableCors({
    origin: '*',
    // allowedHeaders: ['Access-Control-Allow-Origin'],
  });

  //Thư viện check data gửi từ client
  app.useGlobalPipes(new ValidationPipe());

  // thư viện bảo mật của nodejs
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );

  // Swagger: APIs Document
  const config = new DocumentBuilder()
    .setTitle('NguyenDanhDat APIs')
    .setDescription('The APIs for final example development')
    .setVersion('3.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/documents', app, document);
  /*------- MiddleWare ------- */

  // Thư viện nén data: giúp kích thước trả về nhỏ hơn=> nhanh hơn, ít tốn băng thông
  app.use(compression());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
