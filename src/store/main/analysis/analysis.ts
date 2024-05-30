import { getAmountListData } from '@/service/main/analysis/analysis'
import { defineStore } from 'pinia'

interface IAnalysisState {
  amountList: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: []
  }),
  actions: {
    async fetchAnalysisDataAction() {
      const amountResult = await getAmountListData()
      this.amountList = amountResult.data
    }
  }
})

export default useAnalysisStore
