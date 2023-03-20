import { Transform } from 'class-transformer';

export const NumberTransform = () =>
  Transform((value) => {
    if (!value || !value.value) {
      return undefined;
    }
    if (Array.isArray(value.value)) {
      return value.value.map((item) => {
        return Number(item);
      });
    }
    return Number(value.value);
  });
