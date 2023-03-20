import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { removeKeyUndefined } from '../../core/utils/utils';
import { commentDto } from './dto/comment.dto';
import { Comment, CommentDocument } from './comment.schema';

// import { PostController } from './post.controller';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>, // private readonly postController : Model<PostController>
  ) {}

  async getById(id: string) {
    const comment = await this.commentModel.findById(id).lean();
    if (!comment) throw new Error(`Comment with id is ${id} does not exist`);
    return comment;
  }

  async createComment(data: commentDto) {
    const newcomment = new this.commentModel(data);

    const comment = newcomment.save();

    return comment;
  }

  async updateById(id: string, data: commentDto) {
    const comment = await this.commentModel.findById(id).lean();
    if (!comment) throw new Error(`Comment with id is ${id} does not exist`);

    const commentInstance = plainToInstance(Comment, data);

    removeKeyUndefined(commentInstance);

    return this.commentModel.findByIdAndUpdate(
      { ...comment, ...commentInstance, updatedAt: new Date() },
      { new: true },
    );
  }

  async deleteById(id: string) {
    const comment = await this.commentModel.findById(id).lean();
    if (!comment) throw new Error(`Comment with id is ${id} does not exist`);
    return this.commentModel.findByIdAndDelete(id);
  }
}
