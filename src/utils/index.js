/**
 * 判断是真还是假
 * 这里将0也处理为假值
 * @param value
 * @returns {boolean|boolean}
 */
export const isFalsy = (value) => (value === 0 ? false : !value);

/**
 * 清楚值为空的对象的key
 * @param object
 * @returns {*}
 */
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) delete result[key];
  });
  return result;
};
