import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ type: String })
  fisrtName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Date })
  birthDay: Date;

  @Prop({ type: Boolean })
  gender: boolean;

  @Prop({ type: Number })
  age: Number;

  @Prop({ type: String })
  workPlace: String;

  @Prop({ type: String })
  location: String;

  @Prop({ type: String })
  city: String;

  @Prop({ type: String })
  street: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
