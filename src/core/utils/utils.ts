import { existsSync, unlinkSync } from 'fs';

export const removeKeyUndefined = (data: any) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) {
      delete data[key];
    }
  });

  return data;
};

export const totalPagination = (total: number, limit: number): number => {
  return Math.ceil(total / limit);
};

export const randomNumber = () => {
  return `${new Date().getTime()}${Math.round(Math.random() * 1e6)}`;
};

export const deleteFiles = (paths: string[]) => {
  return new Promise((resolve, reject) => {
    paths.forEach((path) => {
      try {
        if (existsSync(path)) unlinkSync(path);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  });
};
