import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { UpLoadController } from './upLoad.controller';

@Module({
  controllers: [UpLoadController],
  providers: [],
})
export class UpLoadModule {}
