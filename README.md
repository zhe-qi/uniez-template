# uniapp-template

一个注重"功能"和"开发体验"的 uniapp 模板。

## 🛠️ 技术栈

- ⚡️ [vite6](https://vitejs.dev/) - 构建工具
- 🖖 [vue3](https://vuejs.org/) - 渐进式框架
- 🎨 [unocss](https://unocss.dev/) - 原子化 CSS 引擎
- 🚦 [uni-mini-router](https://github.com/uni-helper/uni-mini-router) - 小程序路由管理器
- 🚀 [alova](https://alova.js.org/) - 轻量级请求策略库
- 🎯 [uv-ui](https://www.uvui.cn/) - Vue3 UI 框架
- 📜 [z-paging](https://z-paging.zxlee.cn/) - 上拉加载下拉刷新组件
- 📦 [pinia](https://pinia.vuejs.org/) - 状态管理
- 🔷 [typescript](https://www.typescriptlang.org/) - JavaScript 超集
- 🔧 [antfu eslint config](https://github.com/antfu/eslint-config) - 代码规范

## 🔨 快速开始

```bash
# 安装依赖
pnpm install

# 开发
pnpm dev            # H5
pnpm dev:mp-weixin     # 微信小程序

# 打包
pnpm build
```

## ✨ 特性

### 🎨 主题系统

- 运行时动态切换主题
- 基于 CSS 变量实现
- 支持小程序和 H5

### ⚡️ 请求管理

- 基于 alova 的请求策略
- OpenAPI 自动生成
- 全局加载状态管理
- 请求缓存与共享、Token 自动注入
- 推荐安装 alova 的 vscode 插件提升开发体验
- 关于 alova 不 await 或者不 .then 就不执行的情况，使用 useRequest 就行了，否则必须 await 或者 .then

### 🚀 开发体验

- API 自动引入(Vue/Pinia/Alova)
- ESLint + UnoCSS 代码规范
- TypeScript 类型支持、Vue3 代码片段
- store、hook、Vue 和 uniapp API 自动引入
- 支持 $ 开头的功能直接使用，并拥有完整的类型提示
- 支持自动压缩上传服务器或者阿里云OSS或者你可以定义其他上传方式
- 全局等待加载，优雅处理全局异步状态管理、不阻塞ui渲染，可选并行或等待

### 📱 路由增强

- 基于 name 的路由跳转
- 路由守卫拦截、权限控制、页面预加载
- 按钮权限自定义 hasPermission 函数，然后添加自动导入，或者挂载到vue实例上，在页面中使用 v-if 判断

### 📦 分包优化

- 异步跨包调用
- 组件异步加载
- 分包预加载
- 支持小程序和 H5 来自 [uni-ku/bundle-optimizer](https://github.com/uni-ku/bundle-optimizer)

## 📖 开发指南

### 开发环境

- Node.js: 20+(现在很多项目都要求node20以上)
- 包管理器: pnpm(节省磁盘空间)
- IDE: VSCode(会自动推荐插件安装)

### 文档说明

- 代码中包含详细的示例和注释，建议通过阅读源码来掌握框架用法
- 代码结构清晰简单，容易理解和上手

### 组件说明

- 自动导入 `zq-ui` 下的组件(可以更换名字)
- 支持 `component is` 动态组件
- 内置 `z-paging` 列表组件
- 优化的自定义 TabBar

### 工具函数

- 缓存管理(默认7天)
- 全局模板变量(支持ts类型定义)
- 加密解密，md5，base64，aes

### 组件库说明

- 默认使用 uvui 组件库，但不强制绑定
- 建议使用 z-tabs 替代 uv-tabs，对 zpaging 支持更友好
- 未添加 uvui 类型定义，因其类型库存在问题
- 得益于主题系统的设计，可以方便地切换到其他组件库
- 图标库使用 i-lucide-\*，或者 uv-icon，前者按需导入，后者则全部被导入了

### 注意事项

- 关于 public 文件夹，原则上来说静态图片都应该放在 static 下面，public 的存在是为了放一些需要在web服务器根目录的给某些app嵌套h5要求放一些文件
- 关于 hooks，拥有自动导入，定义的 hooks 只要使用 export 导出，就可以自动导入
- 组件库使用 uv-ui(开发体验最好用的组件库)
- 环境变量配置在 .env 和 .env.\* 文件
- 分包配置在 vite.config.ts，分包优化在 pages.config.ts
- 如果自动格式化 eslint 插件没生效。请安装依赖后重启 vscode
- 如果 ts 服务出现异常，请使用 ctrl + shift + p 然后输入 ts server restart，或者重启 vscode
- 如果对 tabbar 有严格要求，可以把 custom 移除，使用原生的
- 关于 pinia 持久化，推荐使用 watch 手动控制，然后在初始化时获取

### 项目结构

```bash
├── .vscode # VSCode 配置
│ ├── extensions.json # 推荐插件
│ └── vue3.code-snippets # Vue3 代码片段
├── env # 环境变量配置
├── plugins # Vite 插件
├── public # 公共资源
├── src
│ ├── api # API 接口
│ ├── components # 组件
│ │ ├── tab-bar # 自定义 TabBar
│ │ └── zq-ui # 自动注册组件
│ ├── hooks # 钩子函数(自动导入)
│ ├── layouts # 布局组件
│ ├── pages # 主包页面
│ │ ├── index # 首页
│ │ ├── my # 我的
│ │ ├── test-page # 测试页面
│ │ └── theme # 主题设置
│ ├── pages-sub # 分包页面
│ │ └── list # 列表页面
│ ├── router # 路由配置
│ ├── store # 状态管理
│ │ └── modules # Store 模块
│ ├── types # 类型定义
│ ├── utils # 工具函数
│ ├── App.vue # 根组件
│ ├── main.ts # 入口文件
│ ├── manifest.json # 应用配置
│ ├── pages.json # 页面配置
│ └── uni.scss # uvui主题样式
├── static # 静态资源
├── .eslintrc.json # ESLint 配置
├── .gitignore # Git 忽略文件
├── manifest.config.ts # 清单配置
├── package.json # 项目配置
├── pages.config.ts # 页面配置
├── tsconfig.json # TypeScript 配置
├── uno.config.ts # UnoCSS 配置
└── vite.config.ts # Vite 配置
```

我理想中的 uniapp组件库 应该是 radix、shadcn/ui、origin ui 那样的组件库，希望有人能实现一个🙏。

## 🤝 贡献

欢迎提交 [Issue](https://github.com/zhe-qi/uniapp-template/issues) 和 PR！

## 📄 开源协议

MIT License © 2024 [zhe-qi](https://github.com/zhe-qi)
