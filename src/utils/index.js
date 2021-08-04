import { useEffect, useState } from "react";

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

/**
 * 用作只执行一次的hook
 * @param callback
 */
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

/**
 * 节流
 * @param value
 * @param delay
 * @returns {unknown}
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    //每次value变化，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    //上一个useEffect执行完，在执行这个清理任务
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
