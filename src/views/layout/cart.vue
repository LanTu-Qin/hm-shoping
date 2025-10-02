<template>
    <div class="cart">
      <!-- navbar -->
      <van-nav-bar
        title="购物车"
      />
      <div v-if="isLogin && cartList.length>0">
          <div class="banner">
          <!-- 总数和编辑 -->
          <div class="totalAndChange">
            <div class="total">共<span style="color:red">{{ cartTotal }}</span>件商品</div>
            <div class="change" @click="isEdit=!isEdit"><van-icon name="edit" />编辑</div>
          </div>
          <!-- 商品列表 -->
          <!-- <van-checkbox-group v-model="result" ref="checkboxGroup">  // 废案：用复选框组和res来实现商品的选择与否
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
          </van-checkbox-group> -->
          <div v-for="item in cartList" :key="item.goods_id" >
            <van-checkbox :value="item.isChecked" @click="toggleCheck(item.goods_id)">
              <van-card :title="item.goods.goods_name" :thumb="item.goods.goods_image">
                <template #price>
                  ￥{{ item.goods.goods_price_min }}
                </template>
                <template #num>
                  <!-- 即想要input原本的形参，又要用函数传参，可以用箭头函数改写 @input="changeCount" ==> @input="(value)=>changeCount(value,item)" -->
                  <CountBox :value="item.goods_num" @input="(value)=>changeCount(value,item.goods_id,item.goods_sku_id)"></CountBox>
                </template>
              </van-card>
            </van-checkbox>
          </div>
        </div>
        <!-- 商品结算 -->
        <van-submit-bar v-if="!isEdit" :price='selPrice*100' :button-text="'结算('+selCount+')'" @submit="onSubmit" :disabled="selCount===0?true:false" safe-area-inset-bottom>
          <van-checkbox :value="isAllChecked" @click="AllChecked">全选</van-checkbox>
        </van-submit-bar>
        <van-submit-bar v-else :price='selPrice*100' button-text="删除" @submit="handleDelete" :disabled="selCount===0?true:false" safe-area-inset-bottom>
          <van-checkbox :value="isAllChecked" @click="AllChecked">全选</van-checkbox>
        </van-submit-bar>
      </div>
      <div class="empty" v-else>
        <img class="emptyImg" src="https://img.ixintu.com/download/jpg/20200905/b37f4527019300b3af7df25202c3ff38_512_512.jpg!ys" alt="">
        <div class="emptyTips">您的购物车是空的，快去逛逛吧</div>
        <van-button type="primary" to="/" color="red" round>去逛逛</van-button>
      </div>
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
      isEdit: false
    }
  },
  created () {
    if (this.isLogin) {
      this.$store.dispatch('cart/getCartAction')
      // this.result = cartList.father(ele => { ele.isChecked === true })
    }
  },
  computed: {
    ...mapState('cart', ['cartList', 'cartTotal']),
    ...mapGetters('cart', ['cartTotalNum', 'selCartList', 'selCount', 'selPrice', 'isAllChecked']),
    isLogin () {
      return this.$store.state.user.userInfo.token !== ''
    }
  },
  methods: {
    onSubmit () {
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'cart',
          cartIds: this.selCartList.map(item => item.id).join(',')
        }
      })
      // console.log(this.selCartList.map(item => item.id).join(','))
    },
    toggleCheck (id) {
      this.$store.commit('cart/toggleCheck', id)
    },
    AllChecked () {
      this.$store.commit('cart/AllChecked', !this.isAllChecked)
    },
    async changeCount (goodsNum, goodsId, goodsSku) {
      this.$store.dispatch('cart/changeCountAction', { goodsId, goodsNum, goodsSku })
    },
    handleDelete () {
      if (this.selCount === 0) return
      console.log(this.selCartList.map(item => item.id))
      this.$store.dispatch('cart/deleteSelect', this.selCartList.map(item => item.id))
      this.isEdit = false
    }
  },
  watch: {
    isEdit: {
      handler (value) {
        console.log(value)
        if (value) {
          this.$store.commit('cart/AllChecked', false)
        } else this.$store.commit('cart/AllChecked', true)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="less">
  html {
    background-color: #f5f5f5;
  }
  .cart{
    .van-nav-bar {
      position: sticky;
      top: 0;
      z-index: 10;
      background: #fff;
      .van-nav-bar__title{
        font-weight: 700;
      }
    }
    .empty {
      .emptyImg {
        width: 80px;
        display: block;
        margin: 40px auto;
      }
      .emptyTips {
        color: #969696;
        text-align: center;
        padding: 30px 0px;
      }
      .van-button {
        margin: 0px 62px;
      }
      .van-button__content {
        width: 210px;
      }
    }
    .banner {
      padding: 0 12px;
      .totalAndChange {
        display: flex;
        justify-content: space-between;
        font-size: 4vw;
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
          font-size: 4vw;
        }
        .van-card__price {
          color: red;
          font-size: 18px;
        }
      }
      }
    }
    .van-submit-bar {
      bottom: 52px;
    }
  }
</style>
