<template>
    <div class="cart">
      <!-- navbar -->
      <van-nav-bar
        title="购物车"
      />
      <div class="banner">
        <!-- 总数和编辑 -->
        <div class="totalAndChange">
          <div class="total">共<span style="color:red">{{ cartTotal }}</span>件商品你</div>
          <div class="change"><van-icon name="edit" />编辑</div>
        </div>
        <!-- 商品列表 -->
        <van-checkbox-group v-model="result" ref="checkboxGroup">  // 非案：用复选框组和res来实现商品的选择与否：前提是商品默认不，选中改进详情：用多个函数mutations更改数据，而不是直接改
          <van-checkbox v-for="item in cartList" :key="item.goods_id" :name="item" @click="result.indexOf(item)>=0?item.isChecked=true:item.isChecked=false">
            <van-card :title="item.goods.goods_name" :thumb="item.goods.goods_image">
              <template #price>
                ￥{{ item.goods.goods_price_min }}
              </template>
              <template #num>
                <CountBox v-model="item.goods_num"></CountBox>
              </template>
            </van-card>
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <!-- 商品结算 -->
      <div class="safe"></div>
      <van-submit-bar :price='selPrice*100' :button-text="'结算('+selCount+')'" @submit="onSubmit" :disabled="selCount===0?true:false" safe-area-inset-bottom>
        <van-checkbox v-model="checked">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'CartIndex',
  components: {
    CountBox
  },
  data () {
    return {
      result: [],
      // cartTotal: 0,
      // cartList: [],
      checked: false
    }
  },
  created () {
    if (this.$store.state.user.userInfo.token !== '') {
      this.$store.dispatch('cart/getCartAction')
      // this.result = cartList.father(ele => { ele.isChecked === true })
    }
  },
  computed: {
    ...mapState('cart', ['cartList', 'cartTotal']),
    ...mapGetters('cart', ['cartTotalNum', 'selCartList', 'selCount', 'selPrice'])
  },
  methods: {
    onSubmit () {}
  }
}
</script>
<style lang="less">
  html {
    background-color: #f5f5f5;
  }
  .cart{
    .van-nav-bar__title{
      font-weight: 700;
    }
    .banner {
      padding: 0 12px;
          .totalAndChange {
      display: flex;
      justify-content: space-between;
    }
    .van-checkbox {
        background-color: #fafafa;
        margin: 10px 0;
        border-radius: 5px;
        .van-checkbox__icon .van-icon {
          left: 7px;
        }
        .van-card {
          .van-card__title {
            font-size: 15px;
          }
          .van-card__price {
            color: red;
            font-size: 18px;
          }
        }
      }
    }
    .safe {
      height: 50px;
    }
    .van-submit-bar {
      bottom: 52px;
    }
  }
</style>
