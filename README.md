# 上传图片

## server端

全局安装gulp

```shell
npm install -g gulp
```

安装依赖包

```
cd ./upload/server
npm install
```

启动

```shell
gulp
```

图片上传目录

```
./upload/server/dist/download
```

## client端口

安装依赖包

```shell
cd ./upload/client
npm install
```

启动

```
node sever.js
```

在浏览器上输入以下地址进行访问:

```
http://localhost:9000/demo1
```

> 备注:上传图片源码是:./upload/client/src/demo1.html和./upload/client/src/js/demo1.js

> 直接打开./upload/client/src/demo1.html也可以进行上传,
