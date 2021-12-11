import React from "react"
import { ProjectListScreen } from "screens/project-list"
import { useAuth } from "context/auth-context"
import styled from "@emotion/styled"
import { ButtonNoPadding, Row } from "components/lib"
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg"
import { Button, Dropdown, Menu } from "antd"
import { Navigate, Route, Routes } from "react-router"
import { ProjectScreen } from "screens/project"
import { BrowserRouter as Router } from "react-router-dom"
import { resetRoute } from "utils"
import { ProjectModel } from "./screens/project-list/project-model"
import { ProjectPopover } from "./components/project-popover"

export const AuthenticatedApp = () => {
  // const [projectModelOpen,setProjectModelOpen] = useState(false)
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path={"/project"} element={<ProjectListScreen />} />
            <Route path={"/project/:projectId/*"} element={<ProjectScreen />} />
            <Navigate to={"/project"} />
          </Routes>
        </Router>
      </Main>
      <ProjectModel />
    </Container>
  )
}

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}
const User = () => {
  const { logout, user } = useAuth()
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi，{user?.name}
      </Button>
    </Dropdown>
  )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 6rem 1fr;
`
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`
const HeaderRight = styled.div``
const Main = styled.main``
