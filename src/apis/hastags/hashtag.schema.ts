import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type HashTagDocument = HashTag & Document;

@Schema({ timestamps: true, versionKey: false })
export class HashTag {
  @Prop({ type: String, required: true })
  hashtag: string;
}
export const HashTagSchema = SchemaFactory.createForClass(HashTag);
