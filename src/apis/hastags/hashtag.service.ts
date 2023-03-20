import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
// import { Hash } from 'crypto';
import { Model } from 'mongoose';
import { removeKeyUndefined } from 'src/core/utils/utils';
import { postDto } from '../post/dtos/post.dto';
import { PostDocument } from '../post/post.schema';
import { PostService } from '../post/post.service';
import { hashTagDto } from './dto/hashtag.dto';
import { HashTag, HashTagDocument } from './hashtag.schema';

@Injectable()
export class HashTagService {
  constructor(
    @InjectModel(HashTag.name)
    private readonly HashTagModel: Model<HashTagDocument>, // private readonly PostService: PostService,
  ) {}

  async createHastag(data: string) {
    // this.PostService.createPost(hashtag);
    const hashTags = new this.HashTagModel(data);

    const chuoi = ['#hoanganh', '#abc', '#xyz'];

    const hashTag = chuoi.map((tag) => ({
      hashtag: tag.slice(1),
    }));
    // console.log(hashTag);

    // const a = hashTags;
    // hashTags.collection.insertOne(chuoi);
    // const newHashTag = await this.HashTagModel.findOne(hashTag).exec();
    // await newHashTag.save();
    return hashTag;
  }

  async updateById(id: string, data: hashTagDto) {
    const hashtag = await this.HashTagModel.findById(id).lean();
    if (!hashtag) throw new Error(`HashTag with id is ${id} does not exist`);

    const postInstance = plainToInstance(HashTag, data);

    removeKeyUndefined(postInstance);

    return this.HashTagModel.findByIdAndUpdate(
      { ...hashtag, ...postInstance, updatedAt: new Date() },
      { new: true },
    );
  }

  async deleteById(id: string) {
    const hashtag = await this.HashTagModel.findById(id).lean();
    if (!hashtag) throw new Error(`HashTag with id is ${id} does not exist`);
    return this.HashTagModel.findByIdAndDelete(id);
  }
}
