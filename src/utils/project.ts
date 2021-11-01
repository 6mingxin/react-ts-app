import { Project } from "screens/project-list/list"
import { useHttp } from "utils/http"
import { useAsync } from "utils/use-async"
import { useEffect } from "react"
import { cleanObject } from "utils/index"

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>() //请求状态hook

  //当每一次param改变的时候都重新请求一遍projects中的数据
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return result
}

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    )
  }
  return {
    mutate,
    ...asyncResult,
  }
}
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (param: Partial<Project>) => {
    return run(
      client(`projects/${param.id}`, {
        data: param,
        method: "POST",
      })
    )
  }
  return {
    mutate,
    ...asyncResult,
  }
}
