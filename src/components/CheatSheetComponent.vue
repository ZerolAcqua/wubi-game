<template lang="pug">
  div
    //- 根据大小屏幕显示不同的 gutter
    el-collapse(value="1")
      el-collapse-item(title="字根图" name="1")
        .rootImg
          img(src="@/assets/root.png")
      el-collapse-item(title="一级简码" name="2")
        el-table(style="width: 100%" :data="tableData")
          el-table-column(prop="t1" label="横区")
          el-table-column(prop="t2" label="竖区")
          el-table-column(prop="t3" label="撇区")
          el-table-column(prop="t4" label="捺区")
          el-table-column(prop="t5" label="折区")
      el-collapse-item(title="二级简码" name="3")
        .rootImg
          img(src="@/assets/86erjijianma.png")
</template>

<style scoped>
.rootImg {
  text-align: center;
}
.rootImg img {
  max-width: 60%;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { t1: 'G（一）', t2: 'H（上）', t3: 'T（和）', t4: 'Y（主）', t5: 'N（民）' },
  { t1: 'F（地）', t2: 'J（是）', t3: 'R（的）', t4: 'U（产）', t5: 'B（了）' },
  { t1: 'D（在）', t2: 'K（中）', t3: 'E（有）', t4: 'I（不）', t5: 'V（发）' },
  { t1: 'S（要）', t2: 'L（国）', t3: 'W（人）', t4: 'O（为）', t5: 'C（以）' },
  { t1: 'A（工）', t2: 'M（同）', t3: 'Q（我）', t4: 'P（这）', t5: 'X（经）' },
])
</script>
