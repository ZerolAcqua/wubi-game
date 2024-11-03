<template lang="pug">
  el-row(:gutter="15")
    el-col.hidden-sm-and-down(:span="5")
      .statistic-card
        el-statistic(:value="usedTime/60" title="用时" suffix="min")
    el-col.hidden-sm-and-down(:span="5")
      .statistic-card
        el-statistic(:value="rightTimes")
          template(#title)
            div(style="display: inline-flex; align-items: center")
              | 正确个数
              el-tooltip(effect="light", content="正确打出的字根或简码字", placement="top")
                el-icon(style="margin-left: 4px", :size="14")
                  Warning


    el-col.hidden-xs-only( :sm="10" :md="5" :lg="5" :xl="5")
      .statistic-card
        el-statistic(:value="typeAvgSpeed")
          template(#title)
            div(style="display: inline-flex; align-items: center")
              | 平均速度
              el-tooltip(effect="light", content="平均每一分钟正确打出的字根或简码字", placement="top")
                el-icon(style="margin-left: 4px", :size="14")
                  Warning

    el-col(:xs="16" :sm="10" :md="5" :lg="5" :xl="5")
      .statistic-card
        el-statistic(:value="rightPercent", title="正确率" suffix="%")

    el-col(:xs="8" :sm="4" :md="4" :lg="4" :xl="4")
        el-button.statistic-button(type="primary" @click="reset")
          el-icon(:size="16")
              Refresh
          | 重置



</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { store } from '@/store'

import { Warning, Refresh } from '@element-plus/icons-vue'

const rightTimes = computed(() => store.statData.rightTimes)
const totalTimes = computed(() => store.statData.totalTimes)
const startDate = computed(() => store.statData.startDate)

const usedTime = ref(0)

const typeAvgSpeed = computed(() => {
  if (usedTime.value == 0) {
    return store.statData.rightTimes * 0
  } else {
    return Math.floor((store.statData.rightTimes / usedTime.value) * 60)
  }
})

const rightPercent = computed(() => {
  const per =
    store.statData.rightTimes === 0
      ? 100
      : (store.statData.rightTimes / store.statData.totalTimes) * 100
  return per
})

const reset = () => {
  store.resetStatData()
}

function updateTime() {
  usedTime.value = Math.floor((Date.now() - startDate.value.getTime()) / 1000)
}

//mount
onMounted(() => {
  setInterval(() => {
    updateTime()
  }, 1000)
})
</script>

<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
  --el-statistic-title-font-size: 14px;
}

.statistic-card {
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-color-primary-light-9);
}

.statistic-button {
  height: 100%;
  width: 100%;
  padding: 20px;
  border-radius: 4px;
}
</style>
