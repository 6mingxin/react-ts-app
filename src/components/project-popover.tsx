import React from "react"
import { useProject } from "../utils/project"
import { Divider, List, Popover, Typography } from "antd"
import styled from "@emotion/styled"
import { ButtonNoPadding } from "./lib"


export const ProjectPopover = (props:{projectButton:JSX.Element}) => {
  const {data:projects,isLoading} = useProject()
  const pinnedProjects = projects?.filter(project => project.pin)
  const content = <ContentContainer>
    <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
    <List>
      {
        pinnedProjects?.map(project => <List.Item>
          <List.Item.Meta title={project.name}/>
        </List.Item>)
      }
    </List>
    <Divider />
    {props.projectButton}
  </ContentContainer>

  return <Popover placement={"bottom"} content={content}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
