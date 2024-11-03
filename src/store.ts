// src/state/index.ts
import { reactive } from 'vue'

export interface Store {
  statData: StatData,
  incrementRightTimes(): void,
  incrementTotalTimes(): void,
  setStatData(statData: StatData): void,
  resetStatData(): void,
}


export interface StatData {
  rightTimes: number,
  totalTimes: number,
  startDate: Date,
}


export const store: Store = reactive({
  statData: {
    rightTimes: 0,
    totalTimes: 0,
    startDate: new Date(),
  },
  incrementRightTimes() {
    store.statData.rightTimes++
  },

  incrementTotalTimes() {
    store.statData.totalTimes++
  },

  setStatData(statData: StatData) {
    store.statData = statData
  },

  resetStatData() {
    store.statData = {
      rightTimes: 0,
      totalTimes: 0,
      startDate: new Date(),
    }
  },


})
