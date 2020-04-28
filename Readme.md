# Whoami

一个无任务依赖使用 Node 编写的 whoami 服务，可用以测试 `docker`，`nginx` 及 `k8s` 服务等，另外也支持 `serverless`，如腾讯云

+ <https://who.shanyue.tech/>: 山月的个人服务器，通过 traefik 及 docker 部署
+ <https://service-gweo1e2s-1257314149.gz.apigw.tencentcs.com/>: 腾讯云云函数

## Usage

+ /*: 返回 whoami 信息，包括服务器的 IP，hostname 信息及 http request headers
+ /bench: 返回 1，可用来做 benchmark
+ /[?wait=d]: 返回 whoami 信息，d 代表毫秒数，代表服务端延迟。在 Node 中使用一个 Promise 来实现

## Example

### docker

``` bash
$ docker run -d -p 3333:3000 --name iamfoo shanyue/whoami

$ curl http://0.0.0.0:3000
Hostname :  6e0030e67d6a
IP :  127.0.0.1
IP :  ::1
IP :  172.17.0.27
IP :  fe80::42:acff:fe11:1b
GET / HTTP/1.1
Host: 0.0.0.0:32769
User-Agent: curl/7.35.0
Accept: */*
```

### 腾讯云

关于腾讯云行数部署的更详细文章请参考以下两个仓库

+ [Serverless Http Component for Tencent Cloud](https://github.com/shfshanyue/serverless-http)
+ [中国云厂商 serverless framework 模板及示例 （更快的访问速度](https://github.com/shfshanyue/serverless-template-zh)

``` bash
# 部署到腾讯云
$ sls

$ curl https://service-gweo1e2s-1257314149.gz.apigw.tencentcs.com/
```

### 阿里云

``` bash
```