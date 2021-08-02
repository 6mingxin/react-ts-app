module.exports = {
  npmUrl: "https://registry.npmjs.org/6mx-react-ts-cli",
  promptTypeList: [
    {
      type: "list",
      message: "请选择拉取的模版类型:",
      name: "type",
      choices: [
        {
          name: "6mx-react-ts模板",
          value: {
            url: "https://github.com/6mingxin/react-ts-app.git", //框架git仓库
            gitName: "6mx-react-ts",
            val: "6mx-react-ts模板",
          },
        },
      ],
    },
  ],
};
