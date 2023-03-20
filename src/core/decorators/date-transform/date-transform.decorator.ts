import { Transform } from 'class-transformer';

export const DateTransform = () =>
  Transform((value) => {
    return value.value ? new Date(Number(value.value)) : null;
  });

export const DateTransformTimeSpan = () =>
  Transform((value) => {
    return value instanceof Date ? value.value.getTime() : null;
  });
