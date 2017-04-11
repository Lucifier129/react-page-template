# react-page-template
react 多页应用的模板，支持服务端渲染

## 用法

### 下载依赖

```shell
npm install
```

### 开发理念

#### server-side
每个页面在 `routes` 目录下开发 node server 端的业务逻辑，包括服务端渲染。

node 框架是 express，服务端模板引擎也是 `React`，所以 `react` 组件是可以共享的。

express view 的路径就配置在 `routes` 目录，可以用 `res.render('home/view', props)` 渲染页面。这种目录设计参考了 [node-hero](https://blog.risingstack.com/node-hero-tutorial-getting-started-with-node-js/)，可以点击查看教程。

``
#### client-side

每个页面在 `src` 目录下开发浏览器端的业务逻辑，`css|img|html` 文件也可以放到 src 目录下，打包时用 gulp 压缩并拷贝到 dest 目录.

每个页面自己爱用什么 model/store/fetch 都可以自由选择。


### 配置server.config.js

`server.config.js` 是 node.js server 端的一些基本配置

```javascript
import path from 'path'
import pkg from './package'
// node server 监听的端口，先从环境变量里取值，再从 package.json 的 config.port 里取，默认为 3000
const port = process.env.PORT || pkg.config.port || 3000

const fat = {
  port: port,
  locationOrigin: `//localhost:${port}`,
  restfulApi: '',
  serverLocationOrigin: `//localhost:${port}`,
  serverRestfulApi: ''
}

const uat = {
  port: port,
  locationOrigin: `//localhost:${port}`,
  restfulApi: '',
  serverLocationOrigin: `//localhost:${port}`,
  serverRestfulApi: ''
}

const prod = {
  port: port,
  locationOrigin: `//localhost:${port}`,
  restfulApi: '',
  serverLocationOrigin: `//localhost:${port}`,
  serverRestfulApi: ''
}

// 从 package.json 的 config 字段里取 basename 和 env，对应不同的「发布路径」和「发布环境」
const basename = pkg.config.vd
const env = pkg.config.env.toLowerCase()
const envConfigMap = { fat, uat, prod }
const envConfig = envConfigMap[env] || envConfigMap.prod

// 输出配置，这个配置包含要传给 view 的一些默认数据
const config = {
  env: env,
  title: 'test',
  description: 'test-description',
  keywords: 'test',
  basename: basename,
  // 静态资源的发布路径，可以根据 env 字段，切换成 CND 或者 node static server
  publicPath: basename + '/static',
  // 静态资源的本地路径，env 为 prod 生产环境时，会使用 dest 目录下的压缩文件
  staticPath: path.join(__dirname, 'dest'),
  // react 服务端渲染时的首次 state
  initialState: undefined,
  // seo html 的字段
  content: '',
  appSettings: { ...envConfig },
  ...envConfig
}

export default config

```


### 启动开发环境

带 webpack-dev-middleware 的模式，该模式不会真正生成文件，而是放到内存里，编译速度较快

```shell
npm start
```

不带 webpack-dev-middleware 的模式，该模式会使用`server.config.js` 里 staticPath 配置目录下的文件

```shell
npm run start:prod
``` 

### 打包源文件

该命令会用 gulp 打包 html css img 等资源，用 webpack 打包 js 资源

```shell
npm run build
```

### 配置 webpack 和 gulp

webpack 和 gulp 配置在 build 目录下。

每个页面都要在 `webpack.config.entry.js` 里配置入口，其中 `vendor` 为大家的公共依赖，每个 page 都要引入 

