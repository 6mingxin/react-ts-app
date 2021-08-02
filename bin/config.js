module.exports = {
  npmUrl: "https://registry.npmjs.org/6mx-react-ts-cli",
  promptTypeList: [
    {
      type: "list",
      message: "请选择拉取的模版类型:",
      name: "type",
      choices: [
        {
          name: "6mx-react-ts-cli前端框架",
          value: {
            url: "https://github.com.cnpmjs.org/6mingxin/react-ts-app.git", //框架git仓库
            gitName: "react-ts-app ",
            val: "react-ts模板",
          },
        },
      ],
    },
  ],
};
