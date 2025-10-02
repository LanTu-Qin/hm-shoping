<template>
    <div class="category">
      <van-nav-bar
      title="全部分类"
    />
    <van-search
      readonly
      shape="round"
      background="#ffffff"
      value="搜索商品"
      @click="$router.push('/search')"
    />
    <div class="sidebar">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item v-for="item in categoryList" :key="item.category_id" :title="item.name" />
      </van-sidebar>
      <div class="commodity">
        <div class="cate-goods" v-for="item in categoryList[activeKey].children" :key="item.category_id" @click="$router.push(`/searchlist?categoryId=${item.category_id}`)">
          <img :src="item.image.external_url" alt="">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    </div>
  </template>

<script>
import { getCategory } from '@/api/category'
export default {
  name: 'CategoryIndex',
  data () {
    return {
      activeKey: 0,
      categoryList: []
    }
  },
  methods: {
    onChange (index) {
      //
    }
  },
  async created () {
    const res = await getCategory()
    this.categoryList = res.data.list
    console.log(res.data.list)
  }
}
</script>

<style lang="less" scoped>
  .sidebar {
    display: flex;
    height:calc(517/667*100vh);
      .van-sidebar{
        display: block;
        width: 86px;
        .van-sidebar-item {
        height: calc(67/667*100vh);
      }
    }
    .commodity {
      flex: 1;
      overflow-y: auto;
      height: 100%;
      .cate-goods {
        display: inline-block;
        width: 89px;
        text-align: center;
        img {
          width: 100%;
        }
      }
    }
  }
</style>
