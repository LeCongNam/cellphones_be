import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join, basename } from 'path';
import { UploadSingleDto } from './dto/uploadSingle.dto';

@Controller('upload')
export class UploadController {
  @Post('single')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: join(__dirname, '../../', 'public', 'uploads'),
        filename: (req, file, cb) => {
          const unixSubffix = Date.now() + Math.round(Math.random() * 1e9);
          const extName = extname(file.originalname);
          const getFileName = basename(file.originalname, extName);
          const fileName = `${getFileName}-${unixSubffix}${extName}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  uploadFile(
    @Body() body: UploadSingleDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      body,
      file,
    };
  }
}
