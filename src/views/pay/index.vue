<template>
  <div class="payIndex">
    <van-nav-bar
      title="订单结算台"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 地址 -->
    <div v-if="1" class="addressArea">
      <div class="icon"><van-icon name="logistics" /></div>
      <div class="text">
        <div class="name">{{ addressList[0].name+addressList[0].phone }}</div>
        <div class="address">{{ longAddress }}</div>
      </div>
      <div class="icon"><van-icon name="arrow" /></div>
    </div>
    <div v-else>
      请选择配送地址
    </div>
    <!-- 订单商品列表 -->
    <div class="goodList">
      <van-card
        v-for="item in order.goodsList"
        :key="item.goods_id"
        :title="item.goods_name"
        :price="item.goods_price"
        :num="item.total_num"
        :thumb="item.goods_image"
      />
    </div>
    <!-- 订单商品合计 -->
    <div class="total">
      <div class="all">
        <span>共{{ order.orderTotalNum }}件商品，合计：<span class="price">￥{{ order.orderTotalPrice}}</span></span>
      </div>
    </div>
    <!-- 费用总计 -->
    <van-cell-group class="cost">
      <van-cell title="订单总金额：">
        <template #default>
          <span class="price">￥{{ order.orderTotalPrice }}</span>
        </template>
      </van-cell>
      <van-cell title="优惠券：" value="无优惠卷可用" />
      <van-cell title="配送费用：" >
        <template #default>
          <span class="price">+￥0.00</span>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 支付方式 -->
    <van-cell-group class="payType">
      <van-cell value="支付方式" />
      <van-cell icon="balance-o">
        <template #title>
          余额支付（可用￥{{personal.balance}}元）
        </template>
        <template #right-icon>
          <van-icon name="passed" class="passed-icon"/>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 买家留言 -->
    <van-field
      v-model="message"
      label="买家留言"
      type="text"
      placeholder="选填:对本次交易的说明"
      maxlength="50"
      clearable
      centered
    />
    <!-- 提交订单 -->
    <van-submit-bar class="submit safe-area-inset-bottom" button-text="提交订单" @submit="onSubmit">
      <template #default>
        <div style="font-size: 4vw; color: #888;">
          实付款：<span style="color: red; font-weight: bold;">￥{{order.orderTotalPrice}}</span>
        </div>
      </template>
    </van-submit-bar>
</div>
</template>

<script>
import { getAddressList } from '@/api/address'
import { cartOrder } from '@/api/order'
export default {
  name: 'PayIndex',
  data () {
    return {
      addressList: [],
      message: '',
      order: {},
      personal: {}
    }
  },
  computed: {
    longAddress () {
      const regin = this.addressList[0].region
      return regin.city + regin.province + regin.region + this.addressList[0].detail
    },
    mode () {
      return this.$route.query.mode
    },
    cartIds () {
      return this.$route.query.cartIds
    },
    obj () {
      return JSON.parse(this.$route.query.obj)
    }
  },
  created () {
    this.getADList()
    // 这里拿不到addressList的数据是因为此时addressList还没赋值
    // console.log(this.addressList)
    this.getcartOrder()
  },
  methods: {
    onSubmit () {
      // 提交订单逻辑
      // 可以根据实际需求补充接口调用等
      this.$toast('订单已提交')
    },
    async getADList () {
      const res = await getAddressList()
      this.addressList = res.data.list
      console.log(this.addressList)
    },
    async getcartOrder () {
      console.log(this.mode)
      if (this.mode === 'cart') {
        console.log(this.cartIds)
      } else console.log(this.obj)

      const { data: { order, personal } } = await cartOrder(this.mode, this.mode === 'cart' ? { cartIds: this.cartIds } : this.obj)
      this.order = order
      this.personal = personal
      console.log(order)
      console.log(personal)
      // const res = await cartOrder(this.mode, this.obj)
      // console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
  .payIndex {
    .van-nav-bar {
      position: sticky;
      top: 0;
      z-index: 10;
      background: #fff;
    }
    .addressArea {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #e5e5e5;
      background:  #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANYAAAANCAYAAADVGpDCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3Yjk4M2ExYy1jMDhkLTQ1OTktYTI0Ny1kZjNjYzdiYTQ5ZTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDQwNkY3RkU5N0NGMTFFNUI3N0M4NTU4MzM2RjlFODIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDQwNkY3RkQ5N0NGMTFFNUI3N0M4NTU4MzM2RjlFODIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNzgwZWI1NS03OGFhLTQzOTUtODQ4OC1lOWI5YmVlYTY1ZDciIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1OTRiYzUyMy1jMzc3LTExNzgtYTdkZS04NGY3YmM1ZGIxMDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz556PLxAAACBElEQVR42tyaSyhEYRTHP48imlKibDQeSSlkSlEWLCRFsZNH5FE2FqQ8ErIRC9lIkTwXSpMkWWChhEJCSnlkoUZGSsr78f98n43CMFPu/Z/6NZuZ2zn33/+cb869XkmLx8IDEQaGQJbgiytQDSY3MyL+LYnL/HxPXSoHDIJQQq2WQQk4Dbbb/yUB29LJ+6e3B66VB3ZITbUIEqSpCGoJBP1ghtBUD6ARpEtTGSEhXzd+awE9oJzQUPegWdf3QlBPMhgDMYRa7YNisGWkpP5qrBQtVBShUHugUE9hs4fUtwG0utlEjRivoA/Ug1sj3vjffr8FNJEK1auPFHcE9UTq5pdK2PwcoAzMG7mjuRrRYEIfK9jiDJSCBZJ6ynSTsBBqNQ0qgdPISbq6vJCFbJOaagrEk5gqWNczRGiqG1Ah1LLMafRkf5pYIUKtZnMJDXUNasAIST2ZYFioRx9ssQaKwJFZEv5uYmWDXVJTrYBEElP562PfPKGpnkAbSDOTqb6aWAGgW6iHol5kQj2CdtAJngnqkc1hHMQRNr9DPaXWzZj8Z2PZtFCxhEIdaKE2CGqRJ4060AH8CLUaALX6f5VpBZLhI9SaeZXQVHKNLt84SCIxVbhQi5YuQlNd6OVElZlN9TGxrGBUn2PZ4lyoTdIsST0FQj0UDSLUak6ot3gcBLVY3wQYAJoVXxmNERajAAAAAElFTkSuQmCC) 0 100% repeat-x;
      background-size: 89px auto;
      .icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #999;
      }
      .text {
        flex: 1;
        margin-left: 10px;
        .name {
          font-size: 16px;
          color: #333;
        }
        .address {
          font-size: 14px;
          color: #666;
        }
      }
    }
    .goodList {
      .van-card {
        background-color: #fff;
        border-bottom: 0.5px solid #e5e5e5;
        .van-card__bottom {
          .van-card__price {
            color: red;
          }
        }
      }
    }
    .total {
      margin-bottom: 10px;
      padding: 10px;
      background-color: #fff;
      font-size: 16px;
      color: #333;
      text-align: right;
      .all {
        display: flex;
        justify-content: flex-end;
      }
      .price {
        color: red;
        font-weight: bold;
      }
    }
   .cost {
    .price {
      color: red;
    }
   }
    .payType {
      margin-top: 10px;
      .passed-icon {
        font-size: 20px;
        color: red;
      }
    }
    .submit {
      .van-submit-bar__bar{
        justify-content: space-between;
      }
    }
    .submit.safe-area-inset-bottom {
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
</style>
