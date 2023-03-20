import { Module } from '@nestjs/common';
import { UserModule } from 'src/apis/user/user.module';
import { AuthModule } from 'src/apis/auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comments/comment.module';
import { UpLoadModule } from './upLoad/upLoad.module';
import { SearchModule } from './search/search.module';
import { HasTagModule } from './hastags/hashtag.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    UpLoadModule,
    SearchModule,
    HasTagModule,
  ],
  controllers: [],
  exports: [],
})
export class ApisModule {}
