# Webpack 分享

What is Webpack?
-
本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle

Webpack 的几个核心概念
-
1. 入口（entry）：webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
2. 出口（output）：告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件
3. loader：让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）
4. plugin（插件）：loader是被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

如何使用Webpack
-
1. webpack命令
2. webpack配置
3. 第三方构建工具（eg: vue-cli）


_一_、简单的打包功能
-
webpack支持三种规范的js代码：es6|commonjs|amd,对于前两种规范属于同步模块，第三种是异步模块（在打包的时候会生成新的bundle）。
命令：webpack --config webpack.config.js entry.js output.js
（webpack默认使用webpack.config.js配置文件，如果没有需要指定配置文件）

==示例代码：d1目录下==

_二_、Babel打包es6/7代码
-
#### Babel loader

#### Babel Presets （针对语法）
- es2015
- es2016
- es2017
- env  (常用：包含前三种以及最新的一些规范)
- babel-preset-stage 0-3 (规范组还没有正式发布的几个阶段)
- babel-preset-react （自定义的 onwards） 
- babel-preset-flow
- babel-preset-typescript
- 其他preset

#### Babel targets
- targets.browsers
- targets.browsers: "last 2 versions" |  ">1%'
- browserslist | Can I use

#### Babel plugins
- 函数和方法Generator、set、map、Array.from...,是有这些插件处理
- Babel Polyfill  （全局垫片，可以全局调用它实现的api，为开发应用准备）
- Babel Runtime Transform (局部垫片，不会污染全局，为开发框架准备)

==示例代码：d2目录下==

_三_、 提取公共代码（针对多entry才有效）
-
### CommonsChunkPlugin
- 减少冗余代码
- 提高加载速度
### 配置
- webpack.optimize.CommonsChunkPlugin(options)
### option
- options.name: string: 公共chunk的名字。如果传入一个已经存在的chunk名，那这个chunk就作为公共chunk存放提取出来的公共代码.否则webpack会新建一个公共chunk。
- options.names: string[]: 和name一样，不过传入的是一个数组。相当于对数组中的每个元素做一次代码切割。
- options.filename
- options.minChunks：（number|infinity|function(module,count)->boolean）: 如果传入数字或infinity(默认值为3)，就是告诉webpack，只有当模块重复的次数大于等于该数字时，这个模块才会被提取出来。当传入为函数时，所有符合条件的chunk中的模块都会被传入该函数做计算，返回true的模块会被提取到目标chunk。
- options.chunks: string[]: webpack会从传入的chunk里面提取公共代码，如果不传则从所有的entry chunk中提取。
- options.children : 当不设置children(deepChildren)的时候，webpack会从entry chunk中根据条件提取公共代码。 当设置children为true时，webpack会从entry chunk的直接子chunk中提取代码.
- options.deepChildren: 和children一样，不过选取公共chunk的所有下属节点。
- options.async: boolean|string:  把公共代码提取到一个懒加载的chunk，在被使用到时才进行下载，当传入值为string的时候，该值会被用来当做懒加载chunk的名字。目前来看一般都是配合children使用(entry chunk在app初始化的时候就会被加载，增加async标签没什么意义)。

### 使用场景
- 单页应用
- 单页应用 + 第三方依赖
- 多页应用 + 第三方依赖 + webpack生成代码

==示例代码：d3目录下==

_四_、 代码分割和懒加载
-
#### 此功能是webpak一直依赖所标榜的一个特性，持续在维护优化中。目的是让用户在更短时间内看到完整的页面。实现此功能并非在配置中，而是改变代码编写方式。
##### 1、webpack methods  webpack的内置方法
- require.ensure(dependencies,callback, errorCallback, chunkName),引入模块蛋不执行，在回调内部再次调用require方法才执行。此方法对原声的promise是有强依赖的，
- require.include(dependencie)，引入模块蛋不执行，当两个子模块里面都依赖同一个模块，可以将这个模块放到父模块引入，这样在加载子模块时就不会多余加载了
##### 2、ES 2015 Loader spec   webpack根据此规范实现了system import 和dynamic import
- System.import() -> import();
- import() -> Promise
- import.then()
- import(
/* webpackChunkName: async-chunk-name */
/* webpackMode: lazy */   magic comment
modulename
)
#### 场景
分离业务代码 和 第三方代码
分离业务代码 和 业务公共代码 和 第三方代码
分离首次加载代码 和 访问后加载代码

==示例代码：d4目录下==

_五_、 CSS的处理
-
### 1、style-loader 创建标签插入html（style-loader/url || style-loader/useable）
##### options 
- insertAt(插入位置)
- insertInto(插入到dom) 
- singleton(是否只有一个style标签)
- transform(转化， 浏览器环境下，插入到页面前)


### 2、css-loader   如何让js去import一个css文件
##### options 
- alias(解析的别名)
- importLoader(@import) 
- Minimize(是否压缩)
- modules(启用css modules)

## 3、CSS Modules
- :local 本地样式
- :global 全局样式
- composse 继承样式
- composse ... from path 从某个文件引入样式
## 4、配置less / sass
#### 依赖的模块
- less
- less-loader
- sass-loader
- node-sass

## 5、提取css代码
#### 依赖的模块
- extract-text-webpack-plugin
 
## 6、PostCSS in Webpack
#### PostCSS
- 转换CSS的工具，功能比较强大，可以自定义很多规则，基于它的生态还有很多插件
- 安装： postcss postcss-loader 
#### AutoPrefixer
- 解析CSS并且填充浏览器前缀

#### cssnano
- 优化压缩css。在css-loader的options中有个minimize的配置，就是用到cssnano
#### cssnext
- 允许开发人员在当前的项目中使用 CSS 将来版本中可能会加入的新特性

==示例代码：d5目录下==

_六_、Tree Shaking
-
#### JS Tree Shaking
- Webpack.optimize.uglifyJS

#### CSS Tree Shaking
- Purify CSS

#### 使用场景
- 常规优化
- 引入第三方库的某一个功能

==示例代码：d6目录下==

_七_、图片处理
-
- css中引入图片 | file-loader 
- 自动合成雪碧图 | postcss-sprites
- 压缩图片 | img-loader
- Base64编码 | url-loader

==示例代码：d7目录下==

_八_、处理第三方JS库
-
- 直接script标签引入
- 本地node_modules中的模块，使用new Webpack.ProvidePlugin({})
- 本地非node_modules中的模块，单独的js库文件，Webpack.ProvidePlugin + resovle.alias配置
- imports-loader
- window对象

==示例代码：d8目录下==

_九_、HTML in Webpack
-
- 自动生成HTML。HtmlWebpackPlugin()
- HTML中引入图片。html-loader和&lt;img src="${require('./src/assets/imgs/5.png')}"&gt;两种方式
- 配合优化

==示例代码：d9目录下==

_十_、开发环境配置
-
### webpack watch mode
### webpack-dev-server
#### 1、提供的功能
- live loading
- 路径重定向
- 支持https
- 浏览器显示编译错误
- 接口代理
- 模块热更新
#### 2、配置项
##### 1). devServer
##### 2). devTool
##### 3). eslint检查代码格式

==示例代码：d10目录下==

![](https://codimd.mucang.cn/uploads/upload_1a84712928307a96b1329f68b9000a55.png)
![](https://codimd.mucang.cn/uploads/upload_dc89c6a107f5a78ec897d4d1cc7c43d7.png)
