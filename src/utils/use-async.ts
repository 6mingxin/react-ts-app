import { useCallback, useReducer, useState } from "react"
import { useMountedRef } from "./index"

interface State<D> {
  error: Error | null
  data: D | null
  stat: "idle" | "loading" | "error" | "success"
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
}

const defaultConfig = {
  throwOnError: false,
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()

  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  )
}

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig }

  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  )

  const [retry, setRetry] = useState(() => () => {})
  const safeDispatch = useSafeDispatch(dispatch)

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch]
  )
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: "error",
        data: null,
      }),
    [safeDispatch]
  )

  //用来装饰异步请求，将请求结果处理成不同状态的函数
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise类型数据")
      }
      setRetry(() => () => {
        console.log("set retry")
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig)
        }
      })
      safeDispatch({ stat: "loading" })
      return promise
        .then((data) => {
          setData(data)
          return data
        })
        .catch((error) => {
          setError(error)
          if (config.throwOnError) return Promise.reject(error)
          return error
        })
    },
    [config.throwOnError, setData, setError, safeDispatch]
  )

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    retry,
    setError,
    ...state,
  }
}
