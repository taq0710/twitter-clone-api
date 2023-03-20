import { Transform, TransformationType } from 'class-transformer';
import { $enum } from 'ts-enum-util';
import * as _ from 'lodash';

const getEnumValue = (transformationType, value, entity) => {
  let newValue;
  switch (transformationType) {
    case TransformationType.CLASS_TO_PLAIN:
      newValue = entity[value];
      break;
    case TransformationType.PLAIN_TO_CLASS:
      if (
        $enum(entity)
          .getKeys()
          .map((item) => `${item}`)
          .includes(value)
      ) {
        newValue = entity[value];
      } else newValue = entity[entity[value]];
      break;
  }
  if (_.isNil(newValue)) {
    return value;
  }
  return newValue;
};

export const EnumTransform = (entity: unknown) =>
  Transform((value) => {
    if (Array.isArray(value.value)) {
      return value.value.map((item) => {
        return getEnumValue(value.type, item, entity);
      });
    }
    return getEnumValue(value.type, value.value, entity);
  });
