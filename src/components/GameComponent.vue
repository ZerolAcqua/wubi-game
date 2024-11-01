<template lang="pug">
  div

    //- 根据大小屏幕显示不同的 gutter
    el-row(
      :class="{ zigen: gameModel == 'zigen' }"
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
          @input="game($event)"
          autofocus="autofocus"
          style="width: 150px"
        )


    el-row(style="margin: 50px 0 20px 0; align-items : center")
      span
        b 统计信息：
        | 当前速度：
        el-tag {{ typeSpeed }}
        | &nbsp; 字/分钟；
        | 正确率：
        el-tag {{ rightPercent }}%
        | ；
      el-button(@click="reset") 重置

    el-collapse(value="1")
      el-collapse-item(title="字根图" name="1")
        .rootImg
          img(src="../assets/root.png")
      el-collapse-item(title="一级简码" name="2")
        el-table(style="width: 100%" :data="tableData")
          el-table-column(prop="t1" label="横区")
          el-table-column(prop="t2" label="竖区")
          el-table-column(prop="t3" label="撇区")
          el-table-column(prop="t4" label="捺区")
          el-table-column(prop="t5" label="折区")
      el-collapse-item(title="二级简码" name="3")
        .rootImg
          img(src="../assets/86erjijianma.png")
</template>

<style scoped>
@font-face {
  font-family: 'HanZiRootFont';
  font-style: normal;
  font-weight: 400;
  src:
    url('../assets/font/HanZiRootFont.woff2') format('woff2'),
    url('../assets/font/HanZiRootFont.ttf') format('ttf');
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
  border: 2px solid #67c23a;
}
.boderError {
  border: 2px solid #f56c6c;
}
.rootImg {
  text-align: center;
}
.rootImg img {
  max-width: 100%;
}
</style>

<script lang="ts">
import 'element-plus/theme-chalk/display.css'

// prettier-ignore
const list = {
  g: ['一', '丁', '丅', '丄', '丂', '七'],
  f: ['丐', '丑', '专', '丒', '丕', '丘', '丙', '世', '丗', '且'],
  d: ['丠', '両', '两', '严', '並', '丢', '丣', '丨', '丩', '个', '丫', '丧'],
  s: ['丰', '丱', '串', '丳'],
  a: ['乀', '乁', '乂', '久', '乄', '乆', '乇', '乃', '么', '之', '乍', '义', '乊', '乌'],
  h: ['乐', '乒', '乗', '乘', '乙', '乕', '乖', '乓', '乔', '乑', '乚'],
  j: ['习', '乡', '乢', '乣', '乤', '乥', '书', '乧', '乨'],
  k: ['买', '乱', '乲'],
  l: ['亀', '亁', '亃', '亂', '亄', '亅', '了', '亇', '争', '予', '亊'],
  m: ['亐', '云', '互', '亓', '五', '井', '亖', '亗'],
  t: ['亠', '亡', '交', '亥', '亢', '亣', '亨', '亦', '产'],
  r: ['亰', '亱', '亳', '亵', '亲', '亶', '亴', '亷', '亹', '亸'],
  e: ['什', '仁', '仃', '仅', '仆', '仄', '仂', '仇', '仈', '仌', '今', '仉', '介'],
  w: ['仐', '仑', '仒', '仓', '仔'],
  q: ['仠', '仡', '令', '仨', '以', '仦', '仢', '代', '仧', '仩', '仪', '仫', '们', '仭', '仮'],
  y: ['仰', '仱', '仲', '仳', '价', '仵', '件', '仴', '仸', '仹'],
  u: ['伀', '企', '伅', '伃', '伇', '伆', '伋', '伄', '伉', '伊', '伂', '伌', '伈'],
  i: ['伐', '伕', '休', '伓', '伒', '优', '会', '伔', '伖', '众', '伙'],
  o: ['传', '伡', '伢', '伤', '伣', '伥'],
  p: ['估', '伴', '伳', '伲', '伱', '伵'],
  n: ['佀', '佁', '佂', '佃', '佄', '佌', '佋', '位', '低', '住', '佐', '佒', '体', '佔', '何', '佖', '佇', '佈', '佉', '但', '佑', '佊', '佅'],
  b: ['你', '佡', '佨', '佥', '佬', '佦', '佩', '佧', '佪', '佫', '佤', '佢', '佣', '佭'],
  v: ['佰', '佱', '佲', '佴', '併', '佶', '佷', '佳'],
  c: ['侀', '侄', '侅', '侃', '侁', '侂'],
  x: ['侓', '侔', '侕', '侖', '侗', '侒', '侐', '侑'],
}

const listYi = {
  g: ['一'],
  f: ['地'],
  d: ['在'],
  s: ['要'],
  a: ['工'],
  h: ['上'],
  j: ['是'],
  k: ['中'],
  l: ['国'],
  m: ['同'],
  t: ['和'],
  r: ['的'],
  e: ['有'],
  w: ['人'],
  q: ['我'],
  y: ['主'],
  u: ['产'],
  i: ['不'],
  o: ['为'],
  p: ['这'],
  n: ['民'],
  b: ['了'],
  v: ['发'],
  c: ['以'],
  x: ['经'],
}

const strErRaw =
  '|五于天末开|下理事画现|玫珠表珍列|玉平不来　|与屯妻到互|\
   |二寺城霜载|直进吉协南|才垢圾夫无|坟增示赤过|志地雪支　|\
   |三夺大厅左|丰百右历面|帮原胡春克|太磁砂灰达|成顾肆友龙|\
   |本村枯林械|相查可楞机|格析极检构|术样档杰棕|杨李要权楷|\
   |七革基苛式|牙划或功贡|攻匠菜共区|芳燕东芝　|世节切芭药|\
   |睛睦　盯虎|止旧占卤贞|睡　肯具餐|眩瞳步眯瞎|卢　眼皮此|\
   |量时晨果虹|早昌蝇曙遇|昨蝗明蛤晚|景暗晃显晕|电最归紧昆|\
   |呈叶顺呆呀|中虽吕另员|呼听吸只史|嘛啼吵　喧|叫啊哪吧哟|\
   |车轩因困　|四辊加男轴|力斩胃办罗|罚较　　边|思　轨轻累|\
   |同财央朵曲|由则　崭册|几贩骨内风|凡赠峭　迪|岂邮　凤　|\
   |生行知条长|处得各力向|笔物秀答称|入科秒秋管|秘季委么第|\
   |后持拓打找|年提扣押抽|手折扔失换|扩拉朱搂近|所报扫反批|\
   |且肝　采肛|　胆肿肋肌|用遥朋脸胸|及胶膛　爱|甩服妥肥脂|\
   |全会估休代|个介保佃仙|作伯仍从你|信们偿伙　|亿他分公化|\
   |钱针然钉氏|外旬名甸负|儿铁角欠多|久匀乐炙锭|包凶争色　|\
   |主计庆订度|让刘训为高|放诉衣认义|方说就变这|记离良充率|\
   |闰半关亲并|站间部曾商|产瓣前闪交|六立冰普帝|决闻妆冯北|\
   |汪法尖洒江|小浊澡渐没|少泊肖兴光|注洋水淡学|沁池当汉涨|\
   |业灶类灯煤|粘烛炽烟灿|烽煌粗伙炮|米料炒炎迷|断籽娄烃　|\
   |定守害宁宽|寂审宫军宙|客宾家空宛|社实宵灾之|官字安　它|\
   |怀导居　民|收慢避惭届|必怕　愉懈|心习悄屡忱|忆敢恨怪尼|\
   |卫际承阿陈|耻阳职阵出|降孤阴队隐|防联孙耿辽|也子限取陛|\
   |姨寻姑杂毁|　旭如舅　|九　奶　婚|妨嫌录灵巡|刀好妇妈姆|\
   |　对参　戏|　　台劝观|矣牟能难允|驻　　　驼|马邓艰双　|\
   |线结顷　红|引旨强细纲|张绵级给约|纺弱纱继综|纪弛绿经比|'

// 先去掉空格和|，再分割成数组
const strEr = strErRaw.replace(/[\s\|]/g, '')
// console.log(strEr)
const listEr = strEr.split('')

//console.log(getRandom());

export default {
  data() {
    return {
      d1: '',
      d2: '',
      d3: '',
      d4: '',
      d5: '',
      intext: '',
      isRight: true,
      errorTimes: 0,
      errorSumTimes: 0,
      rightTimes: 0,
      lastRightDate: new Date(),
      tableData: [
        {
          t1: 'G（一）',
          t2: 'H（上）',
          t3: 'T（和）',
          t4: 'Y（主）',
          t5: 'N（民）',
        },
        {
          t1: 'F（地）',
          t2: 'J（是）',
          t3: 'R（的）',
          t4: 'U（产）',
          t5: 'B（了）',
        },
        {
          t1: 'D（在）',
          t2: 'K（中）',
          t3: 'E（有）',
          t4: 'I（不）',
          t5: 'V（发）',
        },
        {
          t1: 'S（要）',
          t2: 'L（国）',
          t3: 'W（人）',
          t4: 'O（为）',
          t5: 'C（以）',
        },
        {
          t1: 'A（工）',
          t2: 'M（同）',
          t3: 'Q（我）',
          t4: 'P（这）',
          t5: 'X（经）',
        },
      ],
    }
  },
  props: {
    gameModel: String,
  },
  computed: {
    //计算打字速度
    typeSpeed() {
      const time = new Date() - this.lastRightDate
      return Math.floor((60000 / time) * this.rightTimes) || 0
    },
    //正确率
    rightPercent() {
      return this.rightTimes == 0
        ? 100
        : (
            (this.rightTimes / (this.rightTimes + this.errorSumTimes)) *
            100
          ).toFixed(2)
    },
  },
  watch: {
    gameModel(val) {
      this.d1 = ''
      this.d2 = ''
      this.d3 = ''
      this.d4 = ''
      this.d5 = ''
      this.getData()
      this.reset()
      if (val == 'erji') {
        this.$message('当前是二级简码模式，请更换为五笔输入法练习')
      }
      document.getElementById('intext').focus()
    },
  },
  methods: {
    //初始化
    getData() {
      this.d1 = this.d2 == '' ? this.getRandom() : this.d2
      this.d2 = this.d3 == '' ? this.getRandom() : this.d3
      this.d3 = this.d4 == '' ? this.getRandom() : this.d4
      this.d4 = this.d5 == '' ? this.getRandom() : this.d5
      this.d5 = this.getRandom()
    },
    //开始游戏
    game($event) {
      const input = $event.toLowerCase()
      if (this.gameModel == 'erji') {
        if (input == this.d1[1]) {
          this.getData()
          this.rightTimes++
          this.isRight = true
        } else {
          this.isRight = false
          this.errorSumTimes++
        }
        this.intext = ''
        return
      }

      if (input == this.d1[0]) {
        //输入正确
        this.getData()
        this.errorTimes = 0
        this.isRight = true
        this.rightTimes++
      } else {
        this.isRight = false
        this.errorTimes++
        this.errorSumTimes++
        if (this.errorTimes >= 3) {
          this.$message.error('错了哦，正确答案是：' + this.d1[0].toUpperCase())
        }
      }
      this.intext = ''
    },
    reset() {
      this.rightTimes = 0
      this.errorSumTimes = 0
      this.lastRightDate = new Date()
      this.isRight = true
      document.getElementById('intext').focus()
    },
    getRandom() {
      let thisList = list
      switch (this.gameModel) {
        case 'zigen':
          thisList = list
          break
        case 'yiji':
          thisList = listYi
          break
        case 'erji':
          return ['', listEr[Math.floor(Math.random() * listEr.length)]]
      }

      const returnVal = {}
      const keyList = Object.keys(thisList)
      const key = keyList[Math.floor(Math.random() * keyList.length)]
      const values = thisList[key]
      const value = values[Math.floor(Math.random() * values.length)]
      returnVal[key] = value
      return [key, value]
    },
  },
  //初始化方法
  created: function () {
    this.getData()
  },
}
</script>
