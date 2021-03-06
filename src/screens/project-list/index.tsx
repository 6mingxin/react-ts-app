import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useDebounce, useDocumentTitle } from "utils"
import styled from "@emotion/styled"
import { Button, Typography } from "antd"
import { useProject } from "utils/project"
import { useUsers } from "utils/user"
import {
  useProjectModal,
  useProjectsSearchParams,
} from "screens/project-list/util"
import { ButtonNoPadding, Row } from "../../components/lib"

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false)
  const { open } = useProjectModal()
  const [param, setParam] = useProjectsSearchParams()
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProject(useDebounce(param, 200))
  const { data: users } = useUsers()
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  )
}
//跟踪当前组件堆栈信息，解决hook造成的无限渲染问题
ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`
