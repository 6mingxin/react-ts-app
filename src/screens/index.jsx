import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import {useEffect, useState} from "react";
import qs from "qs";
import { cleanObject } from "../utils/index";

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([]);
    const [param, setParam] = useState({
        name: "",
        personId: "",
    });
    const [list, setList] = useState([]);

    //当每一次param改变的时候都重新请求一遍projects中的数据
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (res) => {
            if (res.ok) {
                setList(await res.json());
            }
        });
    }, [param]);
    //页面加载完成请求users
    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async (res) => {
            if (res.ok) {
                setUsers(await res.json());
            }
        });
    }, []);

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} setList={setList}/>
    </div>
  );
};
