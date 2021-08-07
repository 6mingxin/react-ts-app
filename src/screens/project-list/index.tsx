import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import qs from "qs";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const paramDebounce = useDebounce(param, 200);
  const client = useHttp();

  //当每一次param改变的时候都重新请求一遍projects中的数据
  useEffect(() => {
    client("projects", { data: cleanObject(paramDebounce) }).then(setList);
  }, [paramDebounce]);

  //页面加载完成请求users,自定义hook
  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
