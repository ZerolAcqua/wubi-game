<template lang="pug">
  el-container
    el-header
      el-row
        el-col(
          style="color: #fff"
          :xs="24"
          :sm="{ span: 20, offset: 2 }"
          :md="{ span: 18, offset: 3 }"
          :xl="{ span: 12, offset: 6 }"
        )
          h1(style="margin: 0 20px; float: left; line-height: 60px") 五笔练习
          el-menu(
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            ellipsis=false
          )
            el-menu-item(index="1") 字根练习
            el-menu-item(index="2") 一级简码
            el-menu-item(index="3") 二级简码
            el-menu-item(index="4")
              el-icon.no-inherit
                Document(color="#f56c6c")
              a(
                href="https://wubi.yantuz.cn"
                style="color: #f56c6c; text-decoration: none"
                target="_blank"
              )
                b 五笔七天速成 @岩兔站

    el-main
      el-row
        el-col(
          :xs="24"
          :sm="{ span: 20, offset: 2 }"
          :md="{ span: 18, offset: 3 }"
          :xl="{ span: 12, offset: 6 }"
        )
          Game(:gameMode)
          //- Statistic
          CheatSheetComponent


    el-footer(style="text-align: center ")
      | &copy; {{ new Date().getFullYear() }}
      | Zerol Acqua
      //- 换行
      br
      span
        | 借鉴自
        a(href="https://yantuz.cn/") 岩兔站
        | 的源码，在此感谢！

</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 230px;
}

.el-container {
  min-height: 100vh;
}

.el-header {
  background: #545c64;
  /* height: 80px; */
  color: '#fff';
  float: left;
}

.el-menu {
  --el-menu-border-color: #545c64;
  --el-menu-text-color: #fff;
  --el-menu-active-color: #ffd04b;
  --el-menu-hover-text-color: #fff;
  --el-menu-bg-color: #545c64;
  --el-menu-hover-bg-color: #2c3035;
}

.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { Document } from '@element-plus/icons-vue'

import Game from './components/GameComponent.vue'
import Statistic from './components/StatisticComponent.vue'
import CheatSheetComponent from './components/CheatSheetComponent.vue'

const activeIndex = ref('1')
const gameMode = ref('zigen')
const windowWidth = ref(640)

const handleSelect = (key: string) => {
  switch (key) {
    case '1':
      gameMode.value = 'zigen'
      break
    case '2':
      gameMode.value = 'yiji'
      break
    case '3':
      gameMode.value = 'erji'
      break
  }
}

onMounted(() => {
  window.onresize = () => {
    windowWidth.value = document.body.clientWidth
  }
})
</script>
