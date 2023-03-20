import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { User, UserDocument } from 'src/apis/user/user.schema';
import { UserDto } from 'src/apis/user/dtos/user.dto';
import { UserFilterDto } from 'src/apis/user/dtos/user-filter.dto';
import { removeKeyUndefined } from '../../core/utils/utils';
import { sha512 } from 'src/core/utils/hash-password';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>, // private userService: UserService ;
  ) {}

  async getAll(filter: UserFilterDto) {}

  async getById(id: string) {
    const user = await this.userModel.findOne({ _id: id }).lean();
    if (!user) throw new Error(`User with id is ${id} does not exist`);
    return user;
  }

  async updateById(id: string, data: UserDto) {
    const user = await this.userModel.findOne({ _id: id }).lean();
    if (!user) throw new Error(`User with id is ${id} does not exist`);

    const userInstance = plainToInstance(User, data);

    removeKeyUndefined(userInstance);

    return this.userModel.findByIdAndUpdate(
      id,
      { ...user, ...userInstance, updatedAt: new Date() },
      { new: true },
    );
  }

  async deleteById(id: string) {
    const user = await this.userModel.findOne({ _id: id }).lean();
    if (!user) throw new Error(`User with id is ${id} does not exist`);
    return this.userModel.findByIdAndDelete(id);
  }
}
