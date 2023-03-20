import { Transform } from 'class-transformer';
import { isEmpty } from 'lodash';

export const StringTransformArray = () =>
  Transform(({ value }) => {
    // (isEmpty(value) ? undefined : value))
    if (isEmpty(value)) {
      return undefined;
    } else return value.split(',');
  });
