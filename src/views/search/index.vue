<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <form action="/">
      <van-search show-action placeholder="请输入搜索关键词" clearable v-model="value" @search="search_1">
      <template #action>
        <div @click="search_1">搜索</div>
      </template>
    </van-search>
    </form>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length>0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="clear"/>
      </div>
      <div class="list">
        <div class="list-item" @click="search_2" v-for="item in history" :key="item">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistory, updateHistory } from '@/utils/storage'
import { Toast } from 'vant'

export default {
  name: 'SearchIndex',
  data: () => {
    return {
      value: '',
      history: getHistory()
    }
  },
  methods: {
    search_1 () {
      if (this.value === '') Toast('请输入你想搜索的商品')
      else {
        // 找下标删除版：
        // arr.splice(-1,1) 会删除最后一个元素
        // const eleId = this.history.findIndex(ele => { return ele === this.value })
        // if (eleId !== 0) this.history.splice(eleId, 1)

        // filter筛查版：
        this.history = this.history.filter((ele) => { return ele !== this.value })

        this.history.unshift(this.value)

        updateHistory(this.history)
        console.log(this.history)

        this.$router.push(`/searchlist?search=${this.value}`)
      }
    },
    search_2 (item) {
      // console.log(item.target.innerText)
      item = item.target.innerText
      this.value = item
      this.history.splice(this.history.findIndex(ele => { return ele === item }), 1)
      this.history.unshift(item)
      updateHistory(this.history)
      this.$router.push(`/searchlist?search=${this.value}`)
    },
    clear () {
      this.history = []
      updateHistory(this.history)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
