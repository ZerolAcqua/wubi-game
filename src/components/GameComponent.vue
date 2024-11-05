<template lang="pug">
  div
    //- 根据大小屏幕显示不同的 gutter
    el-row(
      :class="{ zigen: gameMode == GameMode.zigen }"
      class="box"
      :gutter= 15
      style="margin-top: 50px"
    )
      el-col(:xs="3" :sm="3" :md="2" :lg="2" :xl="2")
      el-col(:xs="6" :sm="6" :md="4" :lg="4" :xl="4")
        el-card(
          shadow="always"
          :class="isRight ? 'boderNormal' : 'boderError'"
        )
          | {{ d1[1] }}
      el-col(:xs="6" :sm="6" :md="4" :lg="4" :xl="4")
        el-card(shadow="always")
          | {{ d2[1] }}
      el-col(:xs="6" :sm="6" :md="4" :lg="4" :xl="4")
        el-card(shadow="always")
          | {{ d3[1] }}
      el-col.hidden-sm-and-down(:span="4" )
        el-card(shadow="always")
          | {{ d4[1] }}
      el-col.hidden-sm-and-down(:span="4" )
        el-card(shadow="always")
          | {{ d5[1] }}
      el-col(:xs="6" :sm="3" :md="2" :lg="2" :xl="2")

    el-row(style="margin-top: 50px")
      el-col(:span="24" style="text-align: center")
        el-input(
          v-model="intext"
          id="intext"
          placeholder="光标置于此处开始"
          @input="onInput"
          autofocus="autofocus"
          style="width: 150px"
        )

</template>

<style scoped>
@font-face {
  font-family: 'HanZiRootFont';
  font-style: normal;
  font-weight: 400;
  src:
    url('@/assets/font/HanZiRootFont.woff2') format('woff2'),
    url('@/assets/font/HanZiRootFont.ttf') format('ttf');
}
.zigen {
  font-family: HanZiRootFont;
}

/* xs 以上 */
@media screen {
  .box {
    font-size: 1cm;
    text-align: center;
    line-height: 45px;
  }
}
/* xs 以下 */
@media screen and (max-width: 300px) {
  .box {
    font-size: 0.6cm;
    text-align: center;
    line-height: 15px;
  }
}

.el-card {
  --el-card-padding: 20px 5px;
}

.boderNormal {
  border: 2px solid var(--el-color-success-light-3);
}
.boderError {
  border: 2px solid var(--el-color-danger-light-3);
}
</style>

<script setup lang="ts">
import { listRoot, listYi, strErRaw } from '@/data/code'
// 先去掉空格和|，再分割成数组
const strEr = strErRaw.replace(/[\s\|]/g, '')
const listEr = strEr.split('')

import { ref, watch, onMounted, type Ref } from 'vue'
import { ElMessage } from 'element-plus'
import { store } from '@/store'
import { GameMode, type Key } from '@/interface'

// 文字卡片内容
const d1 = ref<string[]>()
const d2 = ref<string[]>()
const d3 = ref<string[]>()
const d4 = ref<string[]>()
const d5 = ref<string[]>()

// 输入内容
const intext = ref('')
// 是否正确
const isRight = ref(true)
const retryTimes = ref(0)

const props = defineProps<{
  gameMode: GameMode
}>()

watch(
  () => props.gameMode,
  val => {
    if (val === GameMode.erji) {
      ElMessage({
        message: `当前是二级简码模式，请更换为五笔输入法练习`,
        grouping: true,
      })
    }
    reset()
  },
)

watch(
  () => store.statData,
  () => {
    intext.value = ''
    document.getElementById('intext')!.focus()
  },
)

function getData() {
  d1.value = d2.value === undefined ? getRandom() : d2.value
  d2.value = d3.value === undefined ? getRandom() : d3.value
  d3.value = d4.value === undefined ? getRandom() : d4.value
  d4.value = d5.value === undefined ? getRandom() : d5.value
  d5.value = getRandom()
}

// input 事件
function onInput(str: string) {
  const input = str.toLowerCase()
  switch (props.gameMode) {
    case GameMode.zigen:
    case GameMode.yiji:
      if (input === d1.value![0]) {
        getData()
        retryTimes.value = 0
        isRight.value = true
        store.incrementRightTimes()
      } else {
        isRight.value = false
        retryTimes.value++
        if (retryTimes.value >= 3) {
          ElMessage({
            message: `错了哦，正确答案是：${d1.value![0].toUpperCase()}`,
            grouping: true,
            type: 'error',
          })
        }
      }
      store.incrementTotalTimes()
      intext.value = ''

      return
    case GameMode.erji:
      if (input === d1.value![1]) {
        getData()
        store.incrementRightTimes()
        isRight.value = true
      } else {
        isRight.value = false
      }
      store.incrementTotalTimes()
      intext.value = ''

      return
    default:
      throw new Error('GameMode error')
  }
}

function reset() {
  d1.value = undefined
  d2.value = undefined
  d3.value = undefined
  d4.value = undefined
  d5.value = undefined
  getData()
  store.resetStatData()

  isRight.value = true
  document.getElementById('intext')!.focus()
}

function getRandom(): [string, string] {
  let thisList = listRoot
  switch (props.gameMode) {
    case GameMode.zigen:
      thisList = listRoot
      break
    case GameMode.yiji:
      thisList = listYi
      break
    case GameMode.erji:
      return ['', listEr[Math.floor(Math.random() * listEr.length)]]
  }

  const keyList = Object.keys(thisList)
  const key = keyList[Math.floor(Math.random() * keyList.length)]
  const values = thisList[key as Key]
  const value = values![Math.floor(Math.random() * values!.length)]
  return [key, value]
}

getData()
</script>
