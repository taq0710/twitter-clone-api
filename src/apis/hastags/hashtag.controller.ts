import {
  Body,
  Controller,
  Delete,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { create } from 'lodash';
// import { async } from 'rxjs';
import { responseError, responseSuccess } from 'src/core/base/base.controller';
// import { postDto } from '../post/dtos/post.dto';
import { hashTagDto } from './dto/hashtag.dto';
import { HashTagService } from './hashtag.service';

@ApiTags('Hashtag')
@Controller('hashtag')
export class HashTagController {
  constructor(private readonly hashTagService: HashTagService) {}
  private readonly logger = new Logger(HashTagController.name);

  @Post('Create')
  async Create(@Body() data: string) {
    try {
      const result = await this.hashTagService.createHastag(data);
      return responseSuccess(result);
      //
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Update a Hashtag' })
  @Put(':id')
  async UpdateById(@Param('id') id: string, @Body() data: hashTagDto) {
    try {
      const result = await this.hashTagService.updateById(id, data);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Delete a Hashtag' })
  @Delete(':id')
  async DeleteById(@Param('id') id: string) {
    try {
      const result = await this.hashTagService.deleteById(id);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }
}
