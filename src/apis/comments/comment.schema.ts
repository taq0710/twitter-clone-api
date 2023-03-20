import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { time } from 'console';
import { Document } from 'mongoose';
// import { type } from 'os';

export type CommentDocument = Comment & Document;
@Schema({ timestamps: true, versionKey: false })
export class Comment {
  @Prop({ type: String, required: true })
  topic: string;

  @Prop({ type: String, required: true })
  userName: string;

  @Prop({ type: String })
  status: string;

  @Prop({ type: String })
  comment: string;

  @Prop({ type: Number })
  tweet: number;

  @Prop({ type: String })
  describe: string;

  @Prop({ type: Number })
  like: number;

  @Prop({ type: Number })
  view: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
