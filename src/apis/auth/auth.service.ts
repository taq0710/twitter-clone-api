import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { result } from 'lodash';
import { Model } from 'mongoose';
import { responseSuccess } from 'src/core/base/base.controller';
import { sha512 } from 'src/core/utils/hash-password';
import { User, UserDocument } from '../user/user.schema';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    //lấy email ra khỏi database
    const { email } = data;
    const isExistsEmail = await this.userModel.findOne({ email }).lean();
    if (isExistsEmail && isExistsEmail.email != email) {
      throw new Error('tai khoan khong dung ');
    }
    if (isExistsEmail && isExistsEmail.password != sha512(data.password)) {
      throw new Error('mat khau khong dung ');
    } else {
      const payload = { uid: isExistsEmail._id };
      delete isExistsEmail.password;
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.KEY_SECRET_JWT,
        }),
        ...isExistsEmail,
      };
    }
  }

  async register(data: RegisterDto) {
    // kiểm tra email có tồn tại hay chưa
    const { email } = data;

    const isExistsEmail = await this.userModel.findOne({ email });

    // nếu tồn tài thì throw error
    if (isExistsEmail) {
      throw new Error('Email nayf khoong ton tai');
    }
    // hash password

    data.password = sha512(data.password);

    // save user

    const newUser = new this.userModel(data);

    const user = await newUser.save();

    // return user
    return user;
  }
}
