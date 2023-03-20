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
import { UserService } from 'src/apis/user/user.service';
import { UserDto } from 'src/apis/user/dtos/user.dto';
import { UserFilterDto } from 'src/apis/user/dtos/user-filter.dto';
import {
  responseError,
  responseSuccess,
} from '../../core/base/base.controller';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(UserController.name);

  @ApiOperation({ summary: 'Get all user' })
  @Get()
  async getAll(@Query() filter: UserFilterDto) {
    try {
      const result = await this.userService.getAll(filter);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const result = await this.userService.getById(id);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Update a user' })
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() data: UserDto) {
    try {
      const result = await this.userService.updateById(id, data);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Delete a user' })
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    try {
      const result = await this.userService.deleteById(id);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }
}
