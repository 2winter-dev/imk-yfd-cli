
#### MS-Store-cli React-Native InspireUI模板项目脚手架

<img src="https://img.shields.io/badge/imk--yfd--cli-MS--STORE%E6%A8%A1%E6%9D%BF%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B-brightgreen">
<img src="https://img.shields.io/badge/imk--yfd--cli-v1.0.13-brightgreen">


- 支持自定义模板源（支持Git仓库）
- 支持命令行逐步初始化配置
- 支持拉取远程仓库模板地址


#### 如何开始？

``npm i -g imk-yfd-cli``

##### 按照命令行要求你需要输入提供：

1.新项目名称

2.对应的WP后台域名

3.对应的Woo的key与密钥

4.对应的通知密钥与支付密钥

5.提供安卓包名：com.xx.xx

6.google-services.json的绝对路径（请前往Firebase后台配置SDK并且下载该文件）

7.输入你的模板库远程仓库

### Next...

`cd {项目名称} &&  yarn install`

### See Your DeviceID

`adb devices`

### Start Work!

`react-native run-android --deviceId={你的设备ID}`


### Notice

1.node_modules 里内置了几个包修复一些MSStore的bug使用。
2.最新适配的RN0.67.4

### Some Errors

1.google-services.json 包名不匹配,你需要从firebase下载对应的文件



### UPDATE

v1.0.11

1.fix Doc.


> Find Me: winter_986@qq.com