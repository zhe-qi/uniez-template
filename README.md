# uniapp-template

一个功能优先且需要一定门槛的 uniapp 的 h5、小程序 模板。

为什么说需要一定门槛，因为模板是开发体验优先的，里面很多好用的规范和功能，但是要使用这些功能需要一定的门槛，比如查询文档学习能力，阅读框架代码能力。

关于 components 下的 zq-ui 文件夹，作用是通过 uniapp 自动导入组件，把一些常用的小组件封装起来方便使用和维护，你也可以改成其他名字，但是要修改 pages.json 下的 "^zq-(.\*)": "@/components/zq-ui/zq-$1/zq-$1.vue"

关于 vscode 插件，使用 vscode 会提示安装必要的插件，建议全部安装

关于 代码片段，输入 vue3 会自动补全 template，后续考虑加入更多代码片段，因为现在是ai辅助开发的时代，过多的代码片段没有必要，难记。

关于 node 版本，尽量使用英文官网的 lts 版本，否则必须 node20+。
关于 包管理工具，使用 pnpm，节省我可怜的磁盘空间。

关于 public 文件夹，原则上来说静态图片都应该放在 static 下面，public 的存在是为了放一些需要在web服务器根目录的给某些app嵌套h5要求放一些文件。

关于 hooks，拥有自动导入，定义的 hooks 只要使用 export 导出，就可以自动导入。

关于 api，alova 学习成本相对较高，你可以选择使用你喜欢的方式管理 api，这里并不限制死，可以使用其他封装，然后移除alova 相关依赖，并移除自动导入 useRequest 。如果使用 alova ，推荐使用自动 swagger.json 生成 api，然后参考 demo 内容修改生成后的 /api/index.ts 文件，然后在 main.ts 中导入 /api/index.ts 文件，推荐安装 alova 的 vscode 插件提升开发体验，alova 的 get 请求 注意缓存策略，建议全局忽略get请求缓存，然后改为手动控制。

关于 alova 不 await 或者不 .then 就不执行的情况，使用 useRequest 就行了，否则必须 await 或者 .then 。

关于 cache 函数，来自一个 uniapp 基础框架 https://gitee.com/h_mo/uniapp-vue3-vite-ts-template/tree/master/src/utils/cache，默认缓存7天，如果不需要缓存时间，可以使用uni的缓存api，否则使用 cache 函数，cache 函数功能更强大。

关于 prettier，commitlint，husky，stylelint：prettier 目前被 antfu config + eslint format 替代，为了简单性 commitlint 和 husky 不默认集成，stylelint 被 unocss 的 eslint 配置替代。

如果需要鉴权，页面权限在路由处理，按钮权限自定义 hasPermission 函数，然后添加自动导入，或者挂载到vue proxy上，在页面中使用 v-if。

关于文档，目前提供示例和注释在代码当中，如果要掌握框架那么阅读代码是必须的，代码并不复杂。

## ✨ 特性

### 🎨 动态主题切换

- 支持运行时动态切换主题
- 主题配置灵活,可自定义

### ⚡️ 全局等待加载

- 优雅处理全局异步状态管理
- 不阻塞ui渲染，可选并行或等待

### 🔥 API 自动生成

- 基于 alova 第三方库
- 支持通过 OpenAPI 规范自动生成 API 调用代码
- 类型安全,开发体验好

### 🎉 小程序增强

- 支持在小程序中使用 component is 特性
- 完美支持 UnoCSS,基于 unocss-preset-weapp 插件

### 📦 依赖管理

- 依赖包持续更新
- 始终保持最新最稳定版本
- 作为启动模板永不过时

### 🚀 自动引入

- store、hook、Vue 和 uniapp API 自动引入
- 支持 $ 开头的功能直接使用，并拥有完整的类型提示

### 🔧 开发体验

- 使用 antfu eslint config
- 内置 UnoCSS eslint 配置
- 代码自动保存格式化
- 推荐 VSCode 插件配置

### 📱 路由管理

- 使用 uni-mini-router
- 基于 name 的路由跳转
- 文件位置修改无需批量替换路径

### 🎈 UI 框架

- 使用 uv-ui 组件库
- 仅使用组件,不使用工具 API
- 保持轻量和灵活性

## 🚧 开发计划

- [ ] 完善请求相关功能
- [ ] 增强其他核心特性
- [ ] 提供更多实用功能

## 🤝 贡献

欢迎提交 Issue 和 PR 参与项目建设！

## 📄 开源协议

MIT License © 2024 [zhe-qi](https://github.com/zhe-qi)
