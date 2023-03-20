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
  UseInterceptors,
} from '@nestjs/common';
import { UploadedFile } from '@nestjs/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { get } from 'lodash';
import { CmsAuth } from 'src/core/auth/decorators/auth/cms-auth.decorators';
import { Pagination } from 'src/core/decorators/pagination/pagination.decorator';
import { PaginationOptions } from 'src/core/decorators/pagination/pagination.model';
// import { async } from 'rxjs';

import {
  responseError,
  responseSuccess,
} from '../../core/base/base.controller';
import { postDto } from './dtos/post.dto';
import { PostFilterDto } from './dtos/post.filter.dto';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  private readonly logger = new Logger(PostController.name);

  @ApiOperation({ summary: 'Get all user' })
  @Get()
  async getAll(
    @Pagination() pagination: PaginationOptions,
    @Query() filter: PostFilterDto,
  ) {
    try {
      const result = await this.postService.getAll(pagination, filter);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @Post('Create')
  @CmsAuth()
  async create(@Body() data: postDto) {
    try {
      const result = await this.postService.createPost(data);
      return responseSuccess(result);
      //
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Get a posts by id' })
  @Get(':id')
  @CmsAuth()
  async getById(@Param('id') id: string) {
    try {
      const result = await this.postService.getById(id);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Update a posts' })
  @Put(':id')
  @CmsAuth()
  async UpdateById(@Param('id') id: string, @Body() data: postDto) {
    try {
      const result = await this.postService.updateById(id, data);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }
  @ApiOperation({ summary: 'Delete a posts' })
  @Delete(':id')
  @CmsAuth()
  async deleteById(@Param('id') id: string) {
    try {
      const result = await this.postService.deleteById(id);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }
}
