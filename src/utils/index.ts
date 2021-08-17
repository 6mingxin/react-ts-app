import { useEffect, useRef, useState } from "react";

/**
 * 判断是真还是假
 * 这里将0也处理为假值
 * @param value
 * @returns {boolean|boolean}
 */
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
/**
 * 清楚值为空的对象的key
 * @param object
 * @returns {*}
 */
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

/**
 * 用作只执行一次的hook
 * @param callback
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/**
 * 节流
 * @param value
 * @param delay
 * @returns {unknown}
 */
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    //每次value变化，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    //上一个useEffect执行完，在执行这个清理任务
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(initialArray: Array<T>) => {
  const [value, setValue] = useState(initialArray);

  return {
    value,
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      let data = [...value];
      data.splice(index, 1);
      setValue(data);
    },
    add: (addValue: T) => setValue([...value, addValue]),
  };
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
