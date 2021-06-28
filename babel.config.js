module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset",
    ["@babel/preset-env", { "modules": false }]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
   //  此处省略无数行，已有的的其他的内容
//    module: {
//     rules: [
//       //  此处省略无数行，已有的的其他的规则
//       {
//         test: /\.less$/,
//         loader: "style-loader!css-loader!less-loader"
//       }
//     ]
// }
}