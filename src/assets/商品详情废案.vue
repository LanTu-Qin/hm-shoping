<template>
    <div class="particular">
     <!-- 头部导航栏 -->
     <van-nav-bar
       title="商品详情页"
       left-arrow
       @click-left="$router.go(-1)"
     />
     <!-- 轮播图 -->
     <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
       <van-swipe-item>1</van-swipe-item>
       <van-swipe-item>2</van-swipe-item>
       <van-swipe-item>3</van-swipe-item>
       <van-swipe-item>4</van-swipe-item>
     </van-swipe>
     <!-- 商品介绍 -->
     <div class="introduce">
       <div class="numInformation"><span class="price">￥0.01</span> <span class="oldprice">￥6699.00</span><span class="sales">已售1000089件</span></div>
       <div class="introduceInformation">手机</div>
       <van-cell is-link @click="show = true">
         <template #title>
           <van-icon name="sign" color="red"/>
           <span class="custom-title">七天无理由退货 </span>
           <van-icon name="sign" color="red"/>
           <span class="custom-title">48小时发货</span>
         </template>
       </van-cell>
       <van-action-sheet v-model="show" title="服务">
         <div class="content">
           <van-icon name="sign" color="red"/>
           <span class="custom-title">
             <span class="summary">七天无理由退货</span>
             <span class="detailed">满足相应条件时，消费者可申请7天无理由退货</span>
           </span>
         </div>
         <div class="content">
           <van-icon name="sign" color="red"/>
           <span class="custom-title">
             <span class="summary">48小时发货</span>
             <span class="detailed">下单后48小时之内发货</span>
           </span>
         </div>
       </van-action-sheet>
     </div>
     <!-- 商品评价 -->
     <van-cell is-link @click="$router.push('/')" title="商品评价（24条）"/>
     <!-- 购物车 -->
     <van-goods-action safe-area-inset-bottom>
       <van-goods-action-icon icon="home-o" text="首页" @click="$router.push('/')" />
       <van-goods-action-icon icon="cart-circle-o" text="购物车" @click="$router.push('/cart')" />
       <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
       <van-goods-action-button type="danger" text="立即购买" @click="$router.push('/pay')" />
     </van-goods-action>
    </div>
   </template>

<script>
import { Toast } from 'vant'
export default {
  name: 'particularIndex',
  data () {
    return {
      show: false
    }
  },
  methods: {
    onClickIcon () {
      Toast('点击图标')
    },
    onClickButton () {
      Toast('点击按钮')
    }
  }
}
</script>

   <style lang="less" scoped>
   .particular {
     background: #fafafa;
     font-size: 19px;
     .my-swipe .van-swipe-item {
       color: #fff;
       font-size: 20px;
       line-height: 150px;
       text-align: center;
       background-color: #39a9ed;
     }
     .introduce {
       .numInformation {
         padding: 0 16px 0 16px;
       }
       .introduceInformation {
         padding: 0 16px 0 16px;
         background: #fff;
       }
       .van-cell {
         background: transparent;
       }
       .van-action-sheet {
           padding: 17px;
           font-size: 20px;
           line-height: 20px;
           .van-action-sheet__header {
             font-size: 22px;
             font-weight: 700;
           }
           .content {
             display: flex;
             padding: 0 59px 0 22px;
             .custom-title {
               width: 260px;
               margin-bottom: 44px;
               .summary {
                 display: inline-block;
               }
               .detailed {
                 margin-top: 14px;
                 font-size: 19px;
                 color: #6d6d6d;
                 display: inline-block;
               }
             }
           }
       }
     }
   }
   </style>
