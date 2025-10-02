<template>
  <div class="searchList">
    <van-nav-bar
    title="商品列表"
    left-arrow
    @click-left="$router.go(-1)"
    />
    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch||'搜索商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>
    <van-tabs v-model="active" @click="changeSort">
      <van-tab>
        <template #title>综合</template>
        <gooditems v-for="item in productlist" :key="item.goods_id" :item="item"></gooditems>
      </van-tab><van-tab>
        <template #title>销量</template>
        <gooditems v-for="item in productlist" :key="item.goods_id" :item="item"></gooditems>
      </van-tab><van-tab>
        <template #title>价格<div class="arrow"><van-icon name="arrow-up" /><van-icon name="arrow-down" /></div></template>
        <gooditems v-for="item in productlist" :key="item.goods_id" :item="item"></gooditems>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getProductList } from '@/api/product'
import gooditems from '@/components/gooditems.vue'
export default {
  name: 'ListIndex',
  data () {
    return {
      active: 0,
      sortprice: 1, // 0:从低到高,1:从高到低
      sorttype: ['all', 'sales', 'price'],
      goodsname: '',
      page: 1,
      productlist: []
    }
  },
  components: {
    gooditems
  },
  computed: {
    // 获取地址栏的参数
    // route:路由信息对象
    // router:路由实例化操作对象
    querySearch () {
      // console.log(this.$route.query.search)
      return this.$route.query.search
    }
  },
  created () {
    this.getProductList()
    // console.log(this.productlist)
  },
  methods: {
    changeSort () {
      const arrows = document.querySelectorAll('.arrow .van-icon')
      if (this.active === 2) {
        this.sortprice = (this.sortprice + 1) % 2
        if (this.sortprice === 0) {
          arrows[0].classList.add('active')
          arrows[1].classList.remove('active')
          this.getProductList()
        } else {
          arrows[1].classList.add('active')
          arrows[0].classList.remove('active')
          this.getProductList()
        }
      } else {
        this.sortprice = 1
        arrows[1].classList.remove('active')
        arrows[0].classList.remove('active')
        this.getProductList()
      }
    },
    async getProductList () {
      const { data: { list } } = await getProductList({
        categoryId: this.$route.query.categoryId,
        sortPrice: this.sortprice,
        goodsName: this.querySearch,
        sortType: this.sorttype[this.active],
        page: this.page
      })
      this.productlist = list.data
    }
  }
}
</script>

<style lang="less" scoped>
.searchList {
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }
  .arrow {
        position: relative;
        top: -6px;
        margin-left: 6px;
        font-size: 13px;
        display:inline-flex;
        flex-direction: column;
        .active {
          color: red;
        }
      }
}
</style>
