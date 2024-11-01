# 五笔练习游戏

由原仓库 https://github.com/yhf7952/WubiGame/ 修改而来，请支持原作者。

## 原作者的五笔教程

[五笔七天速成](https://wubi.yantuz.cn/)

## 改动说明

- 升级为 vue3，并使用相应的 element-plus 组件库
- 修改字体文件中部分错误的字根
- 修改二级简码中部分错误（86 版二级简码不同来源存在差异。我纠正了原码表中明显的错误，经过比对换用了个人觉得最靠谱的码表）

  - 缺失“采”、“秋”
  - “锣“应为”甸”
  - “赫”应为“赤”
  - “成（dm）”应为“面”

## 使用方法

### 源码运行

运行环境：node v20.18.0

```sh
# 安装依赖
npm install
# 启动项目
npm dev
# 发布项目
npm build
```

### 下载发布版本

到 [release](https://github.com/yhf7952/WubiGame/releases) 页面下载最新版本，解压后在浏览器中打开 `index.html`，或部署至其他 web 服务器。

### 在线使用

地址： https://wubigame.yantuz.cn/

## 关注原作者

网站： https://yantuz.cn
