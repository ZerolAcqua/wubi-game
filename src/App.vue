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
          h1.main-title(style="margin: 0 20px; float: left; line-height: 60px") 五笔练习
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
                Document(color="var(--el-color-primary)")
              a(
                href="https://wubi.yantuz.cn"
                style="color: var(--el-color-primary); text-decoration: none"
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
      el-row(style="margin-top: 50px")
        el-col(
          :xs="24"
          :sm="{ span: 20, offset: 2 }"
          :md="{ span: 18, offset: 3 }"
          :xl="{ span: 12, offset: 6 }"
        )
          Stat
      el-row(style="margin-top: 50px")
        el-col(
          :xs="24"
          :sm="{ span: 20, offset: 2 }"
          :md="{ span: 18, offset: 3 }"
          :xl="{ span: 12, offset: 6 }"
        )
          CheatSheet


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

.main-title {
  color: var(--el-color-primary);
}

.el-container {
  min-height: 100vh;
}

.el-header {
  background: var(--el-color-primary-light-7);
  float: left;
}

.el-menu {
  --el-menu-border-color: var(--el-color-primary-text);
  --el-menu-text-color: var(--el-text-color-primary);
  --el-menu-active-color: var(--el-color-primary-dark-2);
  --el-menu-hover-text-color: var(-el-color-primary);
  --el-menu-bg-color: var(--el-color-primary-light-7);
  --el-menu-hover-bg-color: var(--el-color-primary-light-5);
}

.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { Document } from '@element-plus/icons-vue'

import Game from '@/components/GameComponent.vue'
import Stat from '@/components/StatComponent.vue'
import CheatSheet from '@/components/CheatSheetComponent.vue'

import { GameMode } from './interface'

const activeIndex = ref('1')
const gameMode = ref(GameMode.zigen)
const windowWidth = ref(640)

const handleSelect = (key: string) => {
  switch (key) {
    case '1':
      gameMode.value = GameMode.zigen
      break
    case '2':
      gameMode.value = GameMode.yiji
      break
    case '3':
      gameMode.value = GameMode.erji
      break
  }
}

onMounted(() => {
  window.onresize = () => {
    windowWidth.value = document.body.clientWidth
  }
})
</script>
