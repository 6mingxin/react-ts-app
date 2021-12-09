import { useCallback, useReducer } from "react"

const UNDO = "UNDO"
const REDO = "REDO"
const SET = "SET"
const RESET = "RESET"

type State<T> = {
  past: T[]
  present: T
  future: T[]
}

type Action<T> = {
  newPresent?: T
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET
}

export const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state
  const { newPresent } = action

  switch (action.type) {
    case UNDO: {
      if (past.length === 0) return state

      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)

      //return 出去的值就是setState修改的值
      return {
        past: newPast, //设置以前
        present: previous, //设置当前
        future: [present, ...future], //设置以后
      }
    }
    case REDO: {
      if (future.length === 0) return state
      const next = state.future[0]
      const newFuture = state.future.slice(1)
      return {
        past: [...past, present], //设置以前
        present: next, //设置当前
        future: newFuture, //设置以后
      }
    }
    case SET: {
      if (newPresent === present) return state

      return {
        past: [...past, present], //将现在的值加入到曾经
        present: newPresent, //将传入的值设为现在
        future: [], //将以后置空
      }
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      }
    }
  }
}
export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>)

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0
  //后退
  const undo = useCallback(() => dispatch({ type: UNDO }), [])
  //前进
  const redo = useCallback(() => dispatch({ type: REDO }), [])

  //设置当前值
  const set = useCallback(
    (newPresent: T) => dispatch({ type: SET, newPresent }),
    []
  )

  //清空曾经和以后，并将传入的值设为现在
  const reset = useCallback(
    (newPresent: T) => dispatch({ type: RESET, newPresent }),
    []
  )

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const
}
