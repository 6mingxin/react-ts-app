import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";

export const ProjectListScreen = () => {
  const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param, setParam] = useUrlQueryParam(keys);
  const paramDebounce = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProject(paramDebounce);
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};
//跟踪当前组件堆栈信息，解决hook造成的无限渲染问题
ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
