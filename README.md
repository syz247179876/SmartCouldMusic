## 项目简介

SmartCloudMusic是基于Vue.js开发的移动端入门项目，通过搭配调用网易云的后台API实现的一个云音乐的项目。

## 开发周期

本项目为个人独立开发，开发周期一个星期。期间也遇到一些问题，通过谷歌和博客成功解决。

## 知识要点

1.本项目采用vue-cli脚手架进行搭建，开发SPA单页面应用。通过组件化开发，实现尽可能高度复用代码。

2.本项目使用了动态路由，路由嵌套，父子组件传值，axios库和各种钩子函数以及跨域设置，在开发过程中，对各种钩子函数及其原理有了初步了解。

3.本项目适合新手学习和使用，开发过程中，我对必要的功能和细节予以注释.

## 使用教程

在克隆项目前请自行安装node.js和npm

1.克隆本项目：`git clone https://github.com/syz247179876/SmartCouldMusic.git`

2.安装依赖：`npm install`

3.克隆网易云API项目：`git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git`

4.安装依赖：`npm install`

5.启动本项目：` (sudo) npm run dev`

6.启动网易云API项目:  `(sudo) node app.js`

备注：注意端口号，我做项目的时候，网易云API项目的端口号是3000, 如果您的不是，请在我的项目的config文件夹下的index.js中修改target值。

配置跨域：

```javascript
proxyTable: {
            '/api': { // 通用服务请求
                target: 'http://127.0.0.1:3000/', // 接口的域名
                // secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置，为true的话，请求的header将会设置为匹配目标服务器的规则（Access-Control-Allow-Origin）
                pathRewrite: {
                    '^/api': '' // 路径重写, 只有以api开头的才会被转发到http://127.0.0.1:3000/
                }
            },
            '/music-play': { // 音乐播放请求
                target: 'https://music.163.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/music-play': ''
                }
            }
        },
```


## 最后一句

本项目是第一次使用vue.js框架进行开发的小项目，项目中或多或少存在可能不够优化的地方，还请大佬们见谅，适合新手的一个项目。
