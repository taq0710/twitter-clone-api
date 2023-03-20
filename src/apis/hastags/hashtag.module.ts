import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashTagController } from './hashtag.controller';
import { HashTagService } from './hashtag.service';
import { HashTag, HashTagSchema } from './hashtag.schema';
import { postDto } from '../post/dtos/post.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HashTag.name,
        schema: HashTagSchema,
      },
    ]),
  ],
  controllers: [HashTagController],
  providers: [HashTagService],
})
export class HasTagModule {}
