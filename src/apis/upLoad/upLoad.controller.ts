import {
  Body,
  Controller,
  Logger,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiPayloadTooLargeResponse,
  ApiTags,
} from '@nestjs/swagger';
import { responseError, responseSuccess } from 'src/core/base/base.controller';
import { multerDiskOption } from 'src/core/utils/multer';

@ApiTags('upload')
@Controller('upload')
export class UpLoadController {
  private readonly logger = new Logger(UpLoadController.name);

  @Post()
  @UseInterceptors(FilesInterceptor('files', null, multerDiskOption))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiPayloadTooLargeResponse({
    description: 'The upload files size is greater than 10 MB',
  })
  async create(@UploadedFiles() files: Express.Multer.File[]) {
    try {
      const fileURLS = files.map((x) => {
        return process.env.BACKEND_URL + '/file/thumbs/' + x.filename;
      });
      return responseSuccess(fileURLS);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }
}
