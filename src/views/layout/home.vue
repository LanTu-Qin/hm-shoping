<template>
  <div class="home">
    <!-- 导航条 -->
    <van-sticky>
      <van-nav-bar title="智慧商城"/>
    </van-sticky>
    <!-- 搜索栏 -->
    <van-search  shape="round" v-model="value" placeholder="搜索你要找的商品" @click="$router.push('/search')" />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
        <img :src="item.imgUrl" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 通知栏 -->
    <van-notice-bar
    color="#fff"
    background="rgb(82, 82, 82)"
    scrollable
    left-icon="volume-o"
    :text="noticeBar"
    />
    <!-- 格子导航 -->
    <van-grid :column-num="5">
      <van-grid-item v-for="item in gridBar" :key="item.imgUrl" :icon="item.imgUrl" :text="item.text" />
    </van-grid>
    <!-- 主会场 -->
    <div class="main">
    <img :src="bigImg" alt="">
    </div>
    <!-- 猜你喜欢 -->
    <van-divider :style="{color:'#000',borderColor:'#000'}">猜你喜欢</van-divider>
    <!-- 商品列表 -->
    <goodItems v-for="item in goodList" :key="item.goods_id" :item="item"></goodItems>
  </div>
</template>

<script>
import { getHomeData } from '@/api/home'
import goodItems from '@/components/gooditems.vue'
export default {
  name: 'HomeIndex',
  data: () => {
    return {
      value: '',
      bannerList: [],
      noticeBar: '',
      gridBar: [],
      bigImg: '',
      item: {},
      goodList: []
    }
  },
  components: {
    goodItems
  },
  async created () {
    const { data: { pageData: { items } } } = await getHomeData()
    console.log(items)
    this.bannerList = items[1].data
    this.noticeBar = items[2].params.text
    this.gridBar = items[3].data
    this.bigImg = items[4].data[0].imgUrl
    this.goodList = items[6].data
    // console.log(res.data.pageData.items[1].data)
  }
}
</script>
<style lang="less" scoped>
  .home {
    .van-nav-bar {
      background-color: rgb(194, 20, 1);
      /deep/.van-nav-bar__title {
        color:white
      }
    }
    img {
      width: 375px;
    }
  }
</style>
