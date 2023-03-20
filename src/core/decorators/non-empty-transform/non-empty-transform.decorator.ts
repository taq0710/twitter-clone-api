import { Transform } from 'class-transformer';
import { isEmpty } from 'lodash';

export const NonEmptyTransform = () =>
  Transform(({ value }) => (isEmpty(value) ? undefined : value));
