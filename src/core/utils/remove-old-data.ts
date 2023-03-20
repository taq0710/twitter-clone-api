export const removeOldData = (array1: Array<any>, array2: Array<any>) =>
  array1.filter((a) => array2.filter((b) => b._id === a._id).length === 0);
