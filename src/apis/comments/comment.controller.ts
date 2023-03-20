import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { get } from 'lodash';
// import { async } from 'rxjs';

import {
  responseError,
  responseSuccess,
} from '../../core/base/base.controller';
import { commentDto } from './dto/comment.dto';
import { CommentService } from './comment.service';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  private readonly logger = new Logger(CommentController.name);

  @Post('Create')
  async create(@Body() data: commentDto) {
    try {
      const result = await this.commentService.createComment(data);
      return responseSuccess(result);
      //
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Get a comment by id' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const result = await this.commentService.getById(id);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Update a comment' })
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() data: commentDto) {
    try {
      const result = await this.commentService.updateById(id, data);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Delete a comment' })
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    try {
      const result = await this.commentService.deleteById(id);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }
}
