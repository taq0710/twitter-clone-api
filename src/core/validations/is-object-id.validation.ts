import { registerDecorator } from 'class-validator';
import * as mongodb from 'mongodb';

export function IsObjectId() {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: '$property must be a  ObjectId',
      },
      validator: {
        validate(value: any) {
          // console.log(mongodb.ObjectId.isValid(value));

          return mongodb.ObjectId.isValid(value);
        },
      },
    });
  };
}
